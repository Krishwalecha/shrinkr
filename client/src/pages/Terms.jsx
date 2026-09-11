import LegalLayout from "@/components/legal/LegalLayout.jsx";

const Terms = () => {
  return (
    <LegalLayout title="Terms of Service" updated="September 2026">
      <section>
        <h2 className="text-base font-semibold text-foreground">
          1. Acceptance of Terms
        </h2>

        <p className="mt-2">
          By creating an account or using Shrinkr, you agree to these Terms
          of Service. If you do not agree, please do not use the service.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          2. Use of Service
        </h2>

        <p className="mt-2">
          Shrinkr lets you shorten long URLs, set custom aliases, expiration
          dates, and click limits, and view analytics for links you create.
          You are responsible for the links you create and the content they
          point to.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          3. Account Responsibilities
        </h2>

        <p className="mt-2">
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activity that occurs under your
          account. Notify us immediately if you suspect unauthorized use of
          your account.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          4. Prohibited Use
        </h2>

        <p className="mt-2">
          You may not use Shrinkr to create links to content that is
          illegal, fraudulent, malicious, or that facilitates phishing,
          malware distribution, spam, or harassment. We reserve the right to
          disable any link or account that violates this policy.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          5. Link Expiration & Limits
        </h2>

        <p className="mt-2">
          Links may expire or become inactive based on the expiration date
          or click limit you set, or if a link is deactivated from your
          dashboard. We are not responsible for traffic lost due to an
          expired or deactivated link.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          6. Termination
        </h2>

        <p className="mt-2">
          We may suspend or terminate your access to Shrinkr at any time if
          you violate these Terms. You may stop using the service and
          request account deletion at any time.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          7. Disclaimer & Limitation of Liability
        </h2>

        <p className="mt-2">
          Shrinkr is provided "as is" without warranties of any kind. We are
          not liable for any indirect, incidental, or consequential damages
          arising from your use of the service.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          8. Changes to These Terms
        </h2>

        <p className="mt-2">
          We may update these Terms from time to time. Continued use of
          Shrinkr after changes are posted means you accept the updated
          Terms.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-foreground">
          9. Contact Us
        </h2>

        <p className="mt-2">
          If you have any questions about these Terms, reach out to us at{" "}
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

export default Terms;
