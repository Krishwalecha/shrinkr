import { Link, useNavigate } from "react-router-dom";
import authBg from "@/assets/auth-background.webp";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useState } from "react";
import Loader from "@/components/loader.jsx";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { useTheme } from "@/context/ThemeContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!username.trim()) {
      toast.error("Please enter your username");
      return;
    }

    if (!usernameRegex.test(username.trim())) {
      toast.error(
        "Username can only contain letters, numbers, and underscores",
      );
      return;
    }

    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    let res;

    try {
      setIsLoading(true);

      res = await api.post("/auth/register", {
        username: username.trim(),
        email: email.trim(),
        password,
        name: name.trim(),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);

      if (res?.data?.success) {
        toast.success("Signed up successfully, redirecting to sign in...");

        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    }
  };

  return (
    <div
      className={`min-h-screen p-3 ${
        isDark ? "bg-[#131416] text-white" : "bg-[#f7f9fd] text-[#111827]"
      }`}
    >
      <div
        className={`grid min-h-[calc(100vh-24px)] overflow-hidden rounded-2xl border xl:grid-cols-2 ${
          isDark ? "border-white/10" : "border-[#dce5f2]"
        }`}
      >
        <div
          className="hidden bg-cover bg-center xl:block"
          style={{ backgroundImage: `url(${authBg})` }}
        />

        <div
          className={`flex min-h-full flex-col p-6 md:px-10 md:py-8 ${
            isDark ? "bg-[#111214]" : "bg-white"
          }`}
        >
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors duration-150 ${
                isDark
                  ? "text-white/60 hover:bg-white/5 hover:text-white"
                  : "text-[#71809a] hover:bg-[#edf3ff] hover:text-[#111827]"
              }`}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            <div
              className={`ml-3 text-xl font-semibold tracking-tight ${
                isDark ? "text-white" : "text-[#111827]"
              }`}
            >
              shrinkr.
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center py-8">
            <div className="w-full max-w-md">
              <div className="text-center">
                <h1
                  className={`text-3xl font-medium tracking-[-0.04em] ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  Welcome!
                </h1>

                <p
                  className={`mt-2 text-sm ${
                    isDark ? "text-white/45" : "text-[#71809a]"
                  }`}
                >
                  Sign up for URL history and detailed analytics.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2">
                <div
                  className={`overflow-hidden rounded-xl border ${
                    isDark
                      ? "border-white/20 bg-black"
                      : "border-[#dce5f2] bg-[#f7f9fd]"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`w-full bg-transparent px-4 py-3 text-sm outline-none md:text-base ${
                      isDark
                        ? "text-white placeholder:text-white/30"
                        : "text-[#111827] placeholder:text-[#71809a]"
                    }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div
                  className={`overflow-hidden rounded-xl border ${
                    isDark
                      ? "border-white/20 bg-black"
                      : "border-[#dce5f2] bg-[#f7f9fd]"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className={`w-full bg-transparent px-4 py-3 text-sm outline-none md:text-base ${
                      isDark
                        ? "text-white placeholder:text-white/30"
                        : "text-[#111827] placeholder:text-[#71809a]"
                    }`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div
                  className={`overflow-hidden rounded-xl border ${
                    isDark
                      ? "border-white/20 bg-black"
                      : "border-[#dce5f2] bg-[#f7f9fd]"
                  }`}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full bg-transparent px-4 py-3 text-sm outline-none md:text-base ${
                      isDark
                        ? "text-white placeholder:text-white/30"
                        : "text-[#111827] placeholder:text-[#71809a]"
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div
                  className={`flex items-center overflow-hidden rounded-xl border ${
                    isDark
                      ? "border-white/20 bg-black"
                      : "border-[#dce5f2] bg-[#f7f9fd]"
                  }`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none md:text-base ${
                      isDark
                        ? "text-white placeholder:text-white/30"
                        : "text-[#111827] placeholder:text-[#71809a]"
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors ${
                      isDark
                        ? "text-white/40 hover:text-white/80"
                        : "text-[#71809a] hover:text-[#111827]"
                    }`}
                  >
                    {showPassword ? (
                      <EyeOff strokeWidth={1.5} size={19} />
                    ) : (
                      <Eye strokeWidth={1.5} size={19} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSignUp}
                    disabled={isLoading}
                    className="m-1 flex h-9 min-w-[82px] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? <Loader /> : "Sign Up"}
                  </button>
                </div>
              </div>

              <p
                className={`mt-4 text-center text-sm ${
                  isDark ? "text-white/70" : "text-[#71809a]"
                }`}
              >
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className={`underline underline-offset-4 ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  Sign in
                </Link>
              </p>

              <div className="my-6 flex items-center gap-4">
                <div
                  className={`h-px flex-1 ${
                    isDark ? "bg-white/10" : "bg-[#dce5f2]"
                  }`}
                />

                <span
                  className={`text-[10px] ${
                    isDark ? "text-white/30" : "text-[#71809a]"
                  }`}
                >
                  OR
                </span>

                <div
                  className={`h-px flex-1 ${
                    isDark ? "bg-white/10" : "bg-[#dce5f2]"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  className={`flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm transition-colors duration-150 ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.07] hover:text-white"
                      : "border-[#dce5f2] bg-[#f1f5fb] text-[#71809a] hover:bg-[#edf3ff] hover:text-[#111827]"
                  }`}
                >
                  <FaGoogle size={14} />
                  Sign up with Google
                </button>

                <button
                  type="button"
                  className={`flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm transition-colors duration-150 ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.07] hover:text-white"
                      : "border-[#dce5f2] bg-[#f1f5fb] text-[#71809a] hover:bg-[#edf3ff] hover:text-[#111827]"
                  }`}
                >
                  <FaGithub size={14} />
                  Sign up with GitHub
                </button>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center justify-between text-xs ${
              isDark ? "text-white/30" : "text-[#71809a]"
            }`}
          >
            <Link to="/terms" className="transition-colors hover:opacity-70">
              Terms of Service
            </Link>

            <Link to="/privacy" className="transition-colors hover:opacity-70">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUp };
