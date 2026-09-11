import * as React from "react";
import { Check, Link2 } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import { CreateForm } from "@/components/dashboard/create/CreateForm";
import { CreateResult } from "@/components/dashboard/create/CreateResult";

export default function CreateNew() {
  const [longUrl, setLongUrl] = React.useState("");
  const [customAlias, setCustomAlias] = React.useState("");
  const [expiresIn, setExpiresIn] = React.useState(90);
  const [maxClicks, setMaxClicks] = React.useState(-1);

  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const [showQr, setShowQr] = React.useState(false);

  const shortUrl = React.useMemo(() => {
    if (!result) return "";

    const identifier = result.customAlias || result.shortCode;

    return `https://shrinkr.link/${identifier}`;
  }, [result]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      toast.error("Long URL is required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/urls", {
        longUrl: longUrl.trim(),
        customAlias: customAlias.trim() || undefined,
        expiresIn: Number(expiresIn),
        maxClicks: Number(maxClicks),
      });

      setResult(res.data.data);
      setCopied(false);
      setShowQr(false);

      toast.success("Short link created");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create short link",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);
      toast.success("Short link copied");

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleOpen = () => {
    window.open(shortUrl, "_blank", "noopener,noreferrer");
  };

  const handleCreateAnother = () => {
    setResult(null);
    setCopied(false);
    setShowQr(false);
    setLongUrl("");
    setCustomAlias("");
    setExpiresIn(90);
    setMaxClicks(-1);
  };

  if (result) {
    return (
      <div className="flex flex-col gap-6 px-4 lg:px-6">
        <PageHeader
          icon={<Check className="size-5" />}
          title="Link Created"
          description="Your short link is ready to share."
        />

        <CreateResult
          result={result}
          shortUrl={shortUrl}
          copied={copied}
          showQr={showQr}
          onCopy={handleCopy}
          onOpen={handleOpen}
          onToggleQr={() => setShowQr((prev) => !prev)}
          onCreateAnother={handleCreateAnother}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      <PageHeader
        icon={<Link2 className="size-5" />}
        title="Create New Link"
        description="Turn a long URL into a short, shareable link."
      />

      <CreateForm
        longUrl={longUrl}
        setLongUrl={setLongUrl}
        customAlias={customAlias}
        setCustomAlias={setCustomAlias}
        expiresIn={expiresIn}
        setExpiresIn={setExpiresIn}
        maxClicks={maxClicks}
        setMaxClicks={setMaxClicks}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
