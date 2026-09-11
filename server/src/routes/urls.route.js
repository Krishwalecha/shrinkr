import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createShortUrl,
  redirectUrl,
  getUserUrls,
  updateUrl,
  toggleStatus,
  deleteShortUrl,
  batchDeleteUrls,
  getUrlAnalytics,
  getUserAnalytics,
  getOverview,
} from "../controllers/urls.controller.js";

const UrlRouter = Router();

UrlRouter.post("/", verifyJWT, createShortUrl);
UrlRouter.get("/", verifyJWT, getUserUrls);
UrlRouter.get("/overview", verifyJWT, getOverview);
UrlRouter.get("/analytics", verifyJWT, getUserAnalytics);
UrlRouter.delete("/batch", verifyJWT, batchDeleteUrls);
UrlRouter.patch("/:id/status", verifyJWT, toggleStatus);
UrlRouter.patch("/:id", verifyJWT, updateUrl);
UrlRouter.delete("/:id", verifyJWT, deleteShortUrl);
UrlRouter.get("/:id", redirectUrl);
UrlRouter.get("/:id/analytics", verifyJWT, getUrlAnalytics);

export default UrlRouter;
