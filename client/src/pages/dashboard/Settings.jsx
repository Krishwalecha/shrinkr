import { Settings2Icon } from "lucide-react";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import { ProfileForm } from "@/components/dashboard/settings/profile-form";
import { PasswordForm } from "@/components/dashboard/settings/password-form";
import { AppearanceForm } from "@/components/dashboard/settings/appearance-form";
import { DeleteAccount } from "@/components/dashboard/settings/delete-account";

export default function Settings() {
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      <PageHeader
        icon={<Settings2Icon className="size-5" />}
        title="Settings"
        description="Manage your account details and security."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProfileForm />
        <PasswordForm />
        <AppearanceForm />
        <DeleteAccount />
      </div>
    </div>
  );
}
