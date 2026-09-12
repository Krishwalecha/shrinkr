import * as React from "react";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export function DeleteAccount() {
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await api.delete("/users/me");

      setOpen(false);

      toast.success("Account deleted successfully");

      setTimeout(() => {
        setUser(null);
        navigate("/signin", { replace: true });
      }, 2000);
    } catch (error) {
      setDeleting(false);

      toast.error(error?.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <>
      <div className="h-full rounded-xl border border-border bg-card p-6">
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold">Delete account</h3>

          <p className="text-sm text-muted-foreground">
            Permanently delete your account and everything associated with it.
            This will remove your profile, shortened links, and analytics
            permanently.
          </p>
        </div>

        <Button
          variant="destructive"
          className="mt-5"
          onClick={() => setOpen(true)}
          disabled={deleting}
        >
          <Trash2Icon className="size-4" />
          Delete account
        </Button>
      </div>

      <AlertDialog
        open={open}
        onOpenChange={(value) => {
          if (!deleting) {
            setOpen(value);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. Your account, shortened links, and
              analytics will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
