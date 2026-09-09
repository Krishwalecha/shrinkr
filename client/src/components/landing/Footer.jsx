import { Link } from "react-router-dom";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* Footer Content */}
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
            <p className="text-3xl font-semibold tracking-tight text-gray-900">
              shrinkr<span className="text-[#000090]">.</span>
            </p>

            <p className="mt-4 text-sm font-medium leading-6 text-gray-800">
              Short Links.
              <br />
              Big Possibilities.
            </p>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Simple, fast, and built for the web.
            </p>

            {/* Social / Contact */}
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
                  border-gray-200
                  text-gray-500
                  transition-colors
                  duration-150
                  hover:border-gray-300
                  hover:text-gray-900
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
                  border-gray-200
                  text-gray-500
                  transition-colors
                  duration-150
                  hover:border-gray-300
                  hover:text-gray-900
                "
              >
                <FaEnvelope size={16} strokeWidth={1.7} />
              </a>
            </div>
          </div>

          {/* Product */}

          <div className="flex flex-col gap-3">
            <p
              className="
                mb-1
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-gray-400
              "
            >
              Product
            </p>

            <a
              href="#features"
              className="
                text-sm
                text-gray-500
                transition-colors
                duration-150
                hover:text-gray-900
              "
            >
              Features
            </a>

            <a
              href="#process"
              className="
                text-sm
                text-gray-500
                transition-colors
                duration-150
                hover:text-gray-900
              "
            >
              How it works
            </a>

            <Link
              to="/dashboard"
              className="
                text-sm
                text-gray-500
                transition-colors
                duration-150
                hover:text-gray-900
              "
            >
              Dashboard
            </Link>

            <Link
              to="/analytics"
              className="
                text-sm
                text-gray-500
                transition-colors
                duration-150
                hover:text-gray-900
              "
            >
              Analytics
            </Link>
          </div>

          {/* Legal */}

          <div className="flex flex-col gap-3">
            <p
              className="
                mb-1
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-gray-400
              "
            >
              Legal
            </p>

            <Link
              to="/terms"
              className="
                text-sm
                text-gray-500
                transition-colors
                duration-150
                hover:text-gray-900
              "
            >
              Terms of Service
            </Link>

            <Link
              to="/privacy"
              className="
                text-sm
                text-gray-500
                transition-colors
                duration-150
                hover:text-gray-900
              "
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Copyright */}

        <div className="mt-10 border-t border-gray-200 pt-5">
          <p className="text-xs text-gray-400">
            © 2026 Shrinkr. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
