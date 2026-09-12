import { Url } from "../models/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { reservedCustomAliases } from "../constants.js";
import mongoose from "mongoose";
import { Analytics } from "../models/analytics.model.js";
import { UAParser } from "ua-parser-js";
import { randomUUID } from "crypto";

const createShortUrl = asyncHandler(async (req, res) => {
  let user = req.user?.userId || null;
  let visitorId = req.cookies?.visitorId || null;

  if (!user && !visitorId) {
    visitorId = randomUUID();

    res.cookie("visitorId", visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
  }

  const { longUrl, expiresIn = 90, customAlias, maxClicks = -1 } = req.body;

  const normalizedUrl = validateUrl(longUrl);

  if (!Number.isInteger(expiresIn) || expiresIn <= 0) {
    throw new ApiError(400, "Expiration Days must be a positive integer");
  }

  if (!Number.isInteger(maxClicks) || maxClicks < -1 || maxClicks === 0) {
    throw new ApiError(400, "Max clicks must be -1 or a positive integer");
  }

  const normalizedCustomAlias = await validateCustomAlias(customAlias);
  const shortCode = await generateShortCode();

  const expiresAt = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000);

  const url = await Url.create({
    user,
    visitorId,
    longUrl: normalizedUrl,
    shortCode,
    expiresIn,
    expiresAt,
    isActive: true,
    customAlias: normalizedCustomAlias,
    maxClicks,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, url, "Short URL created successfully"));
});

const redirectUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id?.trim()) {
    throw new ApiError(400, "Identifier is required");
  }

  const normalizedId = id.trim();

  const url = await Url.findOne({
    $or: [
      { shortCode: normalizedId },
      { customAlias: normalizedId.toLowerCase() },
    ],
  });

  if (
    !url ||
    !url.isActive ||
    (url.expiresAt && url.expiresAt < new Date()) ||
    (url.maxClicks !== -1 && url.clickCount >= url.maxClicks)
  ) {
    return res.redirect(`${process.env.CORS_ORIGIN}/link-unavailable`);
  }

  updateAnalytics(req, url);

  return res.redirect(url.longUrl);
});

const getUserUrls = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { search, status, sort } = req.query;

  const filter = { user: userId };
  const sortOptions = {};

  if (!sort || sort === "newest") {
    sortOptions.createdAt = -1;
  } else if (sort === "oldest") {
    sortOptions.createdAt = 1;
  } else if (sort === "most-clicked") {
    sortOptions.clickCount = -1;
    sortOptions._id = -1;
  } else if (sort === "least-clicked") {
    sortOptions.clickCount = 1;
    sortOptions._id = -1;
  } else {
    throw new ApiError(400, "Invalid sort option");
  }

  if (search?.trim()) {
    const escapedSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    filter.$or = [
      { longUrl: { $regex: escapedSearch, $options: "i" } },
      { customAlias: { $regex: escapedSearch, $options: "i" } },
      { shortCode: { $regex: escapedSearch, $options: "i" } },
    ];
  }

  if (status === "active") {
    filter.isActive = true;
    filter.expiresAt = { $gt: new Date() };
  } else if (status === "inactive") {
    filter.isActive = false;
    filter.expiresAt = { $gt: new Date() };
  } else if (status === "expired") {
    filter.expiresAt = { $lt: new Date() };
  } else if (status) {
    throw new ApiError(400, "Invalid status option");
  }

  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const urls = await Url.find(filter).sort(sortOptions).skip(skip).limit(limit);

  const totalUrls = await Url.countDocuments(filter);
  const totalPages = Math.ceil(totalUrls / limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        urls,
        pagination: {
          page,
          limit,
          totalUrls,
          totalPages,
        },
      },
      "User URLs retrieved successfully",
    ),
  );
});

const updateUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid URL ID");
  }

  const { longUrl, customAlias, expiresIn, maxClicks } = req.body;
  const url = await Url.findById(id);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (url.user.toString() !== req.user.userId) {
    throw new ApiError(403, "Forbidden");
  }

  if (longUrl !== undefined) {
    url.longUrl = validateUrl(longUrl);
  }

  if (customAlias !== undefined) {
    url.customAlias = await validateCustomAlias(customAlias, url._id);
  }

  if (expiresIn !== undefined) {
    if (!Number.isInteger(expiresIn) || expiresIn <= 0) {
      throw new ApiError(400, "Expiration Days must be a positive integer");
    }

    url.expiresIn = expiresIn;
    url.expiresAt = new Date(
      url.createdAt.getTime() + expiresIn * 24 * 60 * 60 * 1000,
    );
  }

  if (maxClicks !== undefined) {
    if (!Number.isInteger(maxClicks) || maxClicks < -1 || maxClicks === 0) {
      throw new ApiError(400, "Max clicks must be -1 or a positive integer");
    }

    url.maxClicks = maxClicks;
  }

  if (url.expiresAt && url.expiresAt.getTime() < Date.now()) {
    url.isActive = false;
    await url.save();

    return res
      .status(200)
      .json(new ApiResponse(200, url, "URL has expired and was deactivated"));
  }

  await url.save();

  return res
    .status(200)
    .json(new ApiResponse(200, url, "URL updated successfully"));
});

const toggleStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid URL ID");
  }

  const url = await Url.findById(id);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (url.user.toString() !== req.user.userId) {
    throw new ApiError(403, "Forbidden");
  }

  if (!url.isActive && url.expiresAt && url.expiresAt.getTime() < Date.now()) {
    throw new ApiError(400, "Cannot activate an expired URL");
  }

  url.isActive = !url.isActive;
  await url.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        url,
        `URL ${url.isActive ? "activated" : "deactivated"} successfully`,
      ),
    );
});

const deleteShortUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid URL ID");
  }

  const url = await Url.findById(id);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (url.user.toString() !== req.user.userId) {
    throw new ApiError(403, "Forbidden");
  }

  await url.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "URL deleted successfully"));
});

const batchDeleteUrls = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    throw new ApiError(400, "ids must be a non-empty array");
  }

  const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));

  if (validIds.length === 0) {
    throw new ApiError(400, "No valid URL IDs provided");
  }

  const result = await Url.deleteMany({
    _id: { $in: validIds },
    user: req.user.userId,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCount: result.deletedCount },
        `${result.deletedCount} URL(s) deleted successfully`,
      ),
    );
});

const getOverview = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  // Last 90 days, including today
  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);
  startDate.setUTCDate(startDate.getUTCDate() - 89);

  const [stats, clicksOverTime, recentUrls] = await Promise.all([
    Url.aggregate([
      { $match: { user: userObjectId } },
      {
        $group: {
          _id: null,

          totalUrls: { $sum: 1 },

          activeUrls: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$isActive", true] },
                    { $gt: ["$expiresAt", "$$NOW"] },
                  ],
                },
                1,
                0,
              ],
            },
          },

          inactiveUrls: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$isActive", false] },
                    { $gt: ["$expiresAt", "$$NOW"] },
                  ],
                },
                1,
                0,
              ],
            },
          },

          expiredUrls: {
            $sum: {
              $cond: [{ $lt: ["$expiresAt", "$$NOW"] }, 1, 0],
            },
          },

          totalClicks: { $sum: "$clickCount" },
        },
      },
    ]),

    Analytics.aggregate([
      {
        $match: {
          date: { $gte: startDate },
        },
      },

      {
        $lookup: {
          from: Url.collection.name,
          localField: "urlId",
          foreignField: "_id",
          as: "url",
        },
      },

      {
        $unwind: "$url",
      },

      {
        $match: {
          "url.user": userObjectId,
        },
      },

      {
        $group: {
          _id: "$date",
          clicks: { $sum: "$clicks" },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]),

    Url.find({ user: userObjectId }).sort({ createdAt: -1 }).limit(10),
  ]);

  const data = stats[0] ?? {
    totalUrls: 0,
    activeUrls: 0,
    inactiveUrls: 0,
    expiredUrls: 0,
    totalClicks: 0,
  };

  // Fill missing dates with 0 clicks
  const clicksMap = new Map(
    clicksOverTime.map((item) => [
      item._id.toISOString().split("T")[0],
      item.clicks,
    ]),
  );

  const clicks = [];

  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + i);

    const dateKey = date.toISOString().split("T")[0];

    clicks.push({
      date: dateKey,
      clicks: clicksMap.get(dateKey) ?? 0,
    });
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        stats: {
          totalUrls: data.totalUrls,
          activeUrls: data.activeUrls,
          inactiveUrls: data.inactiveUrls,
          expiredUrls: data.expiredUrls,
          totalClicks: data.totalClicks,
        },

        clicksOverTime: clicks,

        recentUrls,
      },
      "Overview data retrieved successfully",
    ),
  );
});

const updateAnalytics = async (req, url) => {
  const urlId = url._id;

  let ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.ip ||
    req.socket?.remoteAddress ||
    "";

  if (ip.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }

  let country = "Unknown";

  try {
    if (ip) {
      const response = await fetch(
        `https://ipwho.is/${encodeURIComponent(ip)}`,
      );

      const data = await response.json();

      if (response.ok && data?.success) {
        country = data.country || "Unknown";
      }
    }
  } catch {}

  const userAgent = req.headers["user-agent"] || "";
  const parsedUserAgent = UAParser(userAgent);

  const os = parsedUserAgent.os.name || "Unknown";

  let browser = parsedUserAgent.browser.name || "Unknown";

  if (browser.includes("Mobile Safari")) {
    browser = "Safari";
  }

  const deviceType =
    (parsedUserAgent.device.type || "desktop").charAt(0).toUpperCase() +
    (parsedUserAgent.device.type || "desktop").slice(1);

  let referrer = "direct";

  if (req.headers["referer"]) {
    try {
      referrer = new URL(req.headers["referer"]).hostname.replace(/^www\./, "");
    } catch {
      referrer = "direct";
    }
  }

  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);

  await Analytics.findOneAndUpdate(
    { urlId, date },
    {
      $inc: {
        clicks: 1,
        [`os.${os}`]: 1,
        [`referrers.${referrer.replace(/\./g, "_")}`]: 1,
        [`browsers.${browser}`]: 1,
        [`countries.${country}`]: 1,
        [`deviceTypes.${deviceType}`]: 1,
      },
    },
    { upsert: true },
  );

  url.clickCount += 1;

  await url.save({
    validateBeforeSave: false,
  });
};

const getUrlAnalytics = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new ApiError(400, "Invalid URL ID");
  }

  const urlId = new mongoose.Types.ObjectId(req.params.id);

  const url = await Url.findById(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (url.user.toString() !== req.user.userId) {
    throw new ApiError(403, "Forbidden");
  }

  const startDate = req.query?.startDate
    ? new Date(req.query.startDate)
    : undefined;
  const endDate = req.query?.endDate ? new Date(req.query.endDate) : undefined;

  const filters = {
    urlId,
  };

  if (startDate) filters.date = { $gte: startDate };
  if (endDate) filters.date = { ...filters.date, $lte: endDate };

  const analytics = await Analytics.aggregate([
    { $match: filters },
    {
      $facet: {
        clicksOverTime: [
          {
            $project: {
              date: 1,
              clicks: 1,
              _id: 0,
            },
          },
        ],
        os: [
          { $project: { _id: 0, os: { $objectToArray: "$os" } } },
          {
            $unwind: "$os",
          },
          {
            $group: {
              _id: "$os.k",
              count: { $sum: "$os.v" },
            },
          },
          {
            $group: {
              _id: null,
              data: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              data: { $arrayToObject: "$data" },
            },
          },
        ],
        referrers: [
          {
            $project: {
              _id: 0,
              referrers: { $objectToArray: "$referrers" },
            },
          },
          {
            $unwind: "$referrers",
          },
          {
            $group: {
              _id: "$referrers.k",
              count: { $sum: "$referrers.v" },
            },
          },
          {
            $group: {
              _id: null,
              data: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              data: { $arrayToObject: "$data" },
            },
          },
        ],
        browsers: [
          {
            $project: {
              _id: 0,
              browsers: {
                $objectToArray: "$browsers",
              },
            },
          },
          {
            $unwind: "$browsers",
          },
          {
            $group: {
              _id: "$browsers.k",
              count: { $sum: "$browsers.v" },
            },
          },
          {
            $group: {
              _id: null,
              data: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              data: { $arrayToObject: "$data" },
            },
          },
        ],
        countries: [
          {
            $project: {
              _id: 0,
              countries: {
                $objectToArray: "$countries",
              },
            },
          },
          {
            $unwind: "$countries",
          },
          {
            $group: {
              _id: "$countries.k",
              count: { $sum: "$countries.v" },
            },
          },
          {
            $group: {
              _id: null,
              data: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              data: { $arrayToObject: "$data" },
            },
          },
        ],
        deviceTypes: [
          {
            $project: {
              _id: 0,
              deviceTypes: {
                $objectToArray: "$deviceTypes",
              },
            },
          },
          {
            $unwind: "$deviceTypes",
          },
          {
            $group: {
              _id: "$deviceTypes.k",
              count: { $sum: "$deviceTypes.v" },
            },
          },
          {
            $group: {
              _id: null,
              data: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              data: { $arrayToObject: "$data" },
            },
          },
        ],
      },
    },
    {
      $project: {
        clicksOverTime: 1,
        breakdown: {
          os: { $arrayElemAt: ["$os.data", 0] },
          countries: { $arrayElemAt: ["$countries.data", 0] },
          deviceTypes: { $arrayElemAt: ["$deviceTypes.data", 0] },
          browsers: { $arrayElemAt: ["$browsers.data", 0] },
          referrers: { $arrayElemAt: ["$referrers.data", 0] },
        },
      },
    },
  ]);

  const result = analytics[0] ?? { clicksOverTime: [], breakdown: {} };

  res.status(200).json(
    new ApiResponse(200, {
      url,
      ...result,
    }),
  );
});

const getUserAnalytics = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.userId);

  const startDateQuery = req.query?.startDate
    ? new Date(req.query.startDate)
    : null;

  const endDateQuery = req.query?.endDate ? new Date(req.query.endDate) : null;

  // Get all URLs belonging to the user
  const urls = await Url.find(
    { user: userId },
    {
      _id: 1,
      createdAt: 1,
    },
  )
    .sort({ createdAt: 1 })
    .lean();

  const urlIds = urls.map((url) => url._id);

  // No URLs
  if (urls.length === 0) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          summary: {
            totalUrls: 0,
            totalClicks: 0,
          },

          clicksOverTime: [],

          os: {},
          browsers: {},
          referrers: {},
          countries: {},
          deviceTypes: {},

          topUrls: [],
        },
        "User analytics retrieved successfully",
      ),
    );
  }

  // First link creation date
  const firstLinkDate = new Date(urls[0].createdAt);
  firstLinkDate.setUTCHours(0, 0, 0, 0);

  // Today
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const startDate = startDateQuery
    ? new Date(startDateQuery)
    : new Date(firstLinkDate);

  const endDate = endDateQuery ? new Date(endDateQuery) : new Date(today);

  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(0, 0, 0, 0);

  // Invalid date range
  if (startDate > endDate) {
    throw new ApiError(400, "Start date cannot be after end date");
  }

  const filter = {
    urlId: {
      $in: urlIds,
    },

    date: {
      $gte: startDate,
      $lte: endDate,
    },
  };

  const analytics = await Analytics.aggregate([
    {
      $match: filter,
    },

    {
      $facet: {
        summary: [
          {
            $group: {
              _id: null,

              totalClicks: {
                $sum: "$clicks",
              },
            },
          },

          {
            $project: {
              _id: 0,
              totalClicks: 1,
            },
          },
        ],

        clicksOverTime: [
          {
            $group: {
              _id: "$date",

              clicks: {
                $sum: "$clicks",
              },
            },
          },

          {
            $sort: {
              _id: 1,
            },
          },

          {
            $project: {
              _id: 0,
              date: "$_id",
              clicks: 1,
            },
          },
        ],

        os: [
          {
            $project: {
              _id: 0,

              os: {
                $objectToArray: "$os",
              },
            },
          },

          {
            $unwind: "$os",
          },

          {
            $group: {
              _id: "$os.k",

              count: {
                $sum: "$os.v",
              },
            },
          },

          {
            $group: {
              _id: null,

              data: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },

          {
            $project: {
              _id: 0,

              data: {
                $arrayToObject: "$data",
              },
            },
          },
        ],

        browsers: [
          {
            $project: {
              _id: 0,

              browsers: {
                $objectToArray: "$browsers",
              },
            },
          },

          {
            $unwind: "$browsers",
          },

          {
            $group: {
              _id: "$browsers.k",

              count: {
                $sum: "$browsers.v",
              },
            },
          },

          {
            $group: {
              _id: null,

              data: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },

          {
            $project: {
              _id: 0,

              data: {
                $arrayToObject: "$data",
              },
            },
          },
        ],

        referrers: [
          {
            $project: {
              _id: 0,

              referrers: {
                $objectToArray: "$referrers",
              },
            },
          },

          {
            $unwind: "$referrers",
          },

          {
            $group: {
              _id: "$referrers.k",

              count: {
                $sum: "$referrers.v",
              },
            },
          },

          {
            $group: {
              _id: null,

              data: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },

          {
            $project: {
              _id: 0,

              data: {
                $arrayToObject: "$data",
              },
            },
          },
        ],

        countries: [
          {
            $project: {
              _id: 0,

              countries: {
                $objectToArray: "$countries",
              },
            },
          },

          {
            $unwind: "$countries",
          },

          {
            $group: {
              _id: "$countries.k",

              count: {
                $sum: "$countries.v",
              },
            },
          },

          {
            $group: {
              _id: null,

              data: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },

          {
            $project: {
              _id: 0,

              data: {
                $arrayToObject: "$data",
              },
            },
          },
        ],

        deviceTypes: [
          {
            $project: {
              _id: 0,

              deviceTypes: {
                $objectToArray: "$deviceTypes",
              },
            },
          },

          {
            $unwind: "$deviceTypes",
          },

          {
            $group: {
              _id: "$deviceTypes.k",

              count: {
                $sum: "$deviceTypes.v",
              },
            },
          },

          {
            $group: {
              _id: null,

              data: {
                $push: {
                  k: "$_id",
                  v: "$count",
                },
              },
            },
          },

          {
            $project: {
              _id: 0,

              data: {
                $arrayToObject: "$data",
              },
            },
          },
        ],

        topUrls: [
          {
            $group: {
              _id: "$urlId",

              clicks: {
                $sum: "$clicks",
              },
            },
          },

          {
            $sort: {
              clicks: -1,
            },
          },

          {
            $limit: 5,
          },

          {
            $lookup: {
              from: "urls",

              localField: "_id",

              foreignField: "_id",

              as: "url",
            },
          },

          {
            $unwind: "$url",
          },

          {
            $project: {
              _id: 0,

              urlId: "$_id",

              clicks: 1,

              shortCode: "$url.shortCode",

              longUrl: "$url.longUrl",

              customAlias: "$url.customAlias",
            },
          },
        ],
      },
    },

    {
      $project: {
        _id: 0,

        summary: {
          $arrayElemAt: ["$summary", 0],
        },

        clicksOverTime: 1,

        os: {
          $arrayElemAt: ["$os.data", 0],
        },

        browsers: {
          $arrayElemAt: ["$browsers.data", 0],
        },

        referrers: {
          $arrayElemAt: ["$referrers.data", 0],
        },

        countries: {
          $arrayElemAt: ["$countries.data", 0],
        },

        deviceTypes: {
          $arrayElemAt: ["$deviceTypes.data", 0],
        },

        topUrls: 1,
      },
    },
  ]);

  const data = analytics[0] || {};

  const clicksMap = new Map(
    (data.clicksOverTime || []).map((item) => [
      new Date(item.date).toISOString().split("T")[0],
      item.clicks,
    ]),
  );

  const clicksOverTime = [];

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split("T")[0];

    clicksOverTime.push({
      date: dateKey,
      clicks: clicksMap.get(dateKey) ?? 0,
    });

    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        summary: {
          totalUrls: urls.length,
          totalClicks: data.summary?.totalClicks ?? 0,
        },

        clicksOverTime,

        os: data.os || {},

        browsers: data.browsers || {},

        referrers: data.referrers || {},

        countries: data.countries || {},

        deviceTypes: data.deviceTypes || {},

        topUrls: data.topUrls || [],
      },

      "User analytics retrieved successfully",
    ),
  );
});

const validateUrl = (url) => {
  if (!url?.trim()) {
    throw new ApiError(400, "Long URL is required");
  }

  let normalizedUrl = url.trim();

  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  try {
    const parsedUrl = new URL(normalizedUrl);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new ApiError(400, "Only HTTP and HTTPS URLs are allowed");
    }

    const hostname = parsedUrl.hostname;

    // Must contain a real domain structure.
    if (!hostname.includes(".")) {
      throw new ApiError(400, "Please enter a valid URL");
    }

    // Validate domain labels.
    const domainRegex =
      /^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

    if (!domainRegex.test(hostname)) {
      throw new ApiError(400, "Please enter a valid URL");
    }

    return parsedUrl.toString();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(400, "Please enter a valid URL");
  }
};

const validateCustomAlias = async (alias, currentUrlId = null) => {
  if (!alias) return;

  const normalizedCustomAlias = alias.trim().toLowerCase() || undefined;

  if (!/^[a-z0-9_-]{3,15}$/.test(normalizedCustomAlias)) {
    throw new ApiError(
      400,
      "Custom alias must be 3-15 characters and contain only letters, numbers, hyphens, or underscores",
    );
  }

  if (reservedCustomAliases.includes(normalizedCustomAlias)) {
    throw new ApiError(400, "This custom alias is reserved");
  }

  const existingUrl = await Url.findOne({
    customAlias: normalizedCustomAlias,
    ...(currentUrlId ? { _id: { $ne: currentUrlId } } : {}),
  });

  if (existingUrl) {
    throw new ApiError(409, "Custom alias is already in use");
  }

  return normalizedCustomAlias;
};

const generateShortCode = async () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const CODE_LENGTH = 7;

  while (true) {
    let shortCode = "";

    for (let i = 0; i < CODE_LENGTH; i++) {
      shortCode += characters[Math.floor(Math.random() * characters.length)];
    }

    const existingShortCode = await Url.exists({ shortCode });

    if (!existingShortCode) {
      return shortCode;
    }
  }
};

export {
  createShortUrl,
  redirectUrl,
  getUserUrls,
  updateUrl,
  toggleStatus,
  deleteShortUrl,
  batchDeleteUrls,
  getOverview,
  getUrlAnalytics,
  getUserAnalytics,
};
