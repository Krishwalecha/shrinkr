import LegalLayout from "@/components/legal/LegalLayout.jsx";

const Privacy = () => {
  return (
    <LegalLayout title="Privacy Policy" updated="September 2026">
      <section>
        <h2 className="text-base font-semibold text-foreground">
          1. Information We Collect
        </h2>

        <p className="mt-2">
          When you create a Shrinkr account, we collect your name, username,
          and email address. When you create short links, we store the
          destination URL, the generated short code or custom alias,
          expiration settings, click limits, and usage data such as click
          counts, timestamps, and general referrer information.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          2. How We Use Your Information
        </h2>

        <p className="mt-2">
          We use this information to operate your account, redirect your
          short links, show you analytics about your links, and keep the
          service secure. We do not sell your personal information to third
          parties.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          3. Cookies & Sessions
        </h2>

        <p className="mt-2">
          Shrinkr uses httpOnly cookies to keep you signed in. These cookies
          are required for the dashboard to function and are not used for
          advertising or third-party tracking.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          4. Data Retention
        </h2>

        <p className="mt-2">
          We retain your account and link data for as long as your account
          is active. You can delete individual links at any time from your
          dashboard. To delete your account entirely, contact us using the
          details below.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          5. Data Sharing
        </h2>

        <p className="mt-2">
          We do not share your personal data with third parties except where
          required to operate the service, such as our hosting and database
          providers, or where required by law.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          6. Your Rights
        </h2>

        <p className="mt-2">
          You can access, update, or delete your account information at any
          time from your dashboard settings, or by reaching out to us
          directly.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          7. Contact Us
        </h2>

        <p className="mt-2">
          If you have any questions about this Privacy Policy, reach out to
          us at{" "}
          <a
            href="mailto:hello@shrinkr.link"
            className="font-medium text-primary hover:underline"
          >
            hello@shrinkr.link
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
};

export default Privacy;
