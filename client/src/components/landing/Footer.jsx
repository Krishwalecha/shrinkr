import { Link } from "react-router-dom";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer
        className="
          mx-auto
          w-full
          max-w-5xl
          px-2
          pb-5
          pt-6
          sm:px-0
          sm:pb-6
          sm:pt-8
        "
      >
        <div
          className="
            grid
            gap-10
            sm:grid-cols-2
            md:grid-cols-[minmax(0,1.6fr)_1fr_1fr]
            md:gap-16
          "
        >
          <div className="max-w-sm">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              shrinkr<span className="text-primary">.</span>
            </p>

            <p className="mt-4 text-sm font-medium leading-6 text-foreground">
              Short Links.
              <br />
              Big Possibilities.
            </p>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Simple, fast, and built for the web.
            </p>

            <div id="contact" className="mt-5 flex items-center gap-2">
              <a
                href="https://github.com/krishwalecha/shrinkr"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="
                  flex
                  size-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-border
                  text-muted-foreground
                  transition-colors
                  duration-150
                  hover:border-foreground/30
                  hover:text-foreground
                "
              >
                <FaGithub size={16} strokeWidth={1.7} />
              </a>

              <a
                href="mailto:hello@shrinkr.link"
                aria-label="Email"
                className="
                  flex
                  size-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-border
                  text-muted-foreground
                  transition-colors
                  duration-150
                  hover:border-foreground/30
                  hover:text-foreground
                "
              >
                <FaEnvelope size={16} strokeWidth={1.7} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p
              className="
                mb-1
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-muted-foreground
              "
            >
              Product
            </p>

            <a
              href="#features"
              className="
                text-sm
                text-muted-foreground
                transition-colors
                duration-150
                hover:text-foreground
              "
            >
              Features
            </a>

            <a
              href="#process"
              className="
                text-sm
                text-muted-foreground
                transition-colors
                duration-150
                hover:text-foreground
              "
            >
              Process
            </a>

            <Link
              to="/dashboard/overview"
              className="
                text-sm
                text-muted-foreground
                transition-colors
                duration-150
                hover:text-foreground
              "
            >
              Dashboard
            </Link>

            <Link
              to="/dashboard/analytics"
              className="
                text-sm
                text-muted-foreground
                transition-colors
                duration-150
                hover:text-foreground
              "
            >
              Analytics
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p
              className="
                mb-1
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-muted-foreground
              "
            >
              Legal
            </p>

            <Link
              to="/terms"
              className="
                text-sm
                text-muted-foreground
                transition-colors
                duration-150
                hover:text-foreground
              "
            >
              Terms of Service
            </Link>

            <Link
              to="/privacy"
              className="
                text-sm
                text-muted-foreground
                transition-colors
                duration-150
                hover:text-foreground
              "
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-5">
          <p className="text-xs text-muted-foreground">
            © 2026 Shrinkr. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
