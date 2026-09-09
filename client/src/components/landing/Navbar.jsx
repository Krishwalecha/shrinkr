import { useEffect, useRef, useState } from "react";
import { User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const avatarLetter = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = async () => {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      setUser(null);
      setOpen(false);
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed, please try again.",
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-5 sm:px-6 sm:pt-6">
      <nav
        className="
          flex
          h-[60px]
          items-center
          justify-between
          rounded-full
          border
          border-white/20
          bg-white/[0.10]
          px-4
          text-white
          backdrop-blur-md
          sm:px-5
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="
            text-xl
            font-semibold
            tracking-[-0.025em]
            transition-opacity
            duration-200
            hover:opacity-80
          "
        >
          shrinkr.
        </Link>

        {/* Navigation */}
        <div
          className="
            hidden
            items-center
            gap-7
            text-sm
            text-white/70
            md:flex
          "
        >
          <a
            href="#process"
            className="transition-colors duration-200 hover:text-white"
          >
            Process
          </a>

          <a
            href="#features"
            className="transition-colors duration-200 hover:text-white"
          >
            Features
          </a>

          <a
            href="#contact"
            className="transition-colors duration-200 hover:text-white"
          >
            Contact
          </a>
        </div>

        {!user ? (
          /* Logged out */
          <Link
            to="/signin"
            className="
              flex
              h-10
              items-center
              gap-1.5
              rounded-full
              border
              border-white/15
              bg-white/[0.12]
              px-4
              text-sm
              font-medium
              text-white
              transition-all
              duration-200
              hover:border-white/20
              hover:bg-white/[0.20]
            "
          >
            <User size={16} strokeWidth={1.7} />
            <span>Sign in</span>
          </Link>
        ) : (
          /* Logged in */
          <div ref={dropdownRef} className="relative">
            {/* User trigger */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-full
                border
                border-white/15
                bg-white/[0.12]
                pl-1.5
                pr-3
                text-sm
                font-medium
                text-white
                transition-all
                duration-200
                hover:border-white/20
                hover:bg-white/[0.20]
              "
            >
              {/* Avatar */}
              <span
                className="
                  flex
                  size-7
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-xs
                  font-semibold
                  text-[#3262DA]
                "
              >
                {avatarLetter}
              </span>

              {/* Name */}
              <span className="hidden max-w-[110px] truncate sm:block">
                {user.name}
              </span>

              <ChevronDown
                size={14}
                strokeWidth={1.7}
                className={`
                  text-white/65
                  transition-transform
                  duration-200
                  ${open ? "rotate-180" : ""}
                `}
              />
            </button>

            {open && (
              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+10px)]
                  z-50
                  w-[280px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/15
                  bg-[#10265D]/95
                  p-1.5
                  shadow-[0_18px_50px_rgba(5,15,50,0.30)]
                  backdrop-blur-xl
                "
              >
                {/* User info */}
                <div className="rounded-xl px-3.5 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="
                        flex
                        size-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-sm
                        font-semibold
                        text-[#3262DA]
                      "
                    >
                      {avatarLetter}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-white/50">
                        @{user.username}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 truncate text-xs text-white/50">
                    {user.email}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-1 border-t border-white/10" />

                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    h-10
                    items-center
                    gap-2.5
                    rounded-xl
                    px-3
                    text-sm
                    text-white/75
                    transition-colors
                    duration-150
                    hover:bg-white/[0.08]
                    hover:text-white
                  "
                >
                  <LayoutDashboard size={16} strokeWidth={1.6} />

                  <span>Dashboard</span>
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    h-10
                    w-full
                    items-center
                    gap-2.5
                    rounded-xl
                    px-3
                    text-sm
                    text-white/60
                    transition-colors
                    duration-150
                    hover:bg-white/[0.08]
                    hover:text-white
                    cursor-pointer
                  "
                >
                  <LogOut size={16} strokeWidth={1.6} />

                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
