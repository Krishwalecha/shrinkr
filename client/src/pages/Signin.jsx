import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader.jsx";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import authBg from "@/assets/auth-background.webp";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { useTheme } from "@/context/ThemeContext";

const Signin = () => {
  const { setUser, user } = useAuth();
  const { resolvedTheme } = useTheme();

  const navigate = useNavigate();
  if (user) navigate("/");

  const [searchParams] = useSearchParams();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      toast.error("Something went wrong signing in, please try again");
    }
  }, [searchParams]);

  const handleLogin = async () => {
    let res;

    try {
      setIsLoading(true);

      res = await api.post(
        "/auth/login",
        {
          id: identifier,
          password,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);

      if (res?.data?.success) {
        toast.success("Logged in successfully, redirecting...");

        setUser(res.data.data);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!identifier.trim()) {
        toast.error("Please enter a valid email or username");
        return;
      }

      setStep(2);
      return;
    }

    handleLogin();
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

          <div className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-md">
              <div className="text-center">
                <h1
                  className={`text-3xl font-medium tracking-[-0.04em] ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  Welcome back!
                </h1>

                <p
                  className={`mt-2 text-sm ${
                    isDark ? "text-white/45" : "text-[#71809a]"
                  }`}
                >
                  Sign in for URL history and detailed analytics.
                </p>
              </div>

              <form className="mt-7" onSubmit={handleSubmit}>
                {step === 1 ? (
                  <div
                    className={`flex overflow-hidden rounded-xl border ${
                      isDark
                        ? "border-white/20 bg-black"
                        : "border-[#dce5f2] bg-[#f7f9fd]"
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Enter your username or email"
                      autoComplete="username"
                      className={`min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none md:text-base ${
                        isDark
                          ? "text-white placeholder:text-white/30"
                          : "text-[#111827] placeholder:text-[#71809a]"
                      }`}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      autoFocus
                    />

                    <button
                      type="submit"
                      className="m-1 shrink-0 cursor-pointer rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:opacity-90"
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div
                      className={`overflow-hidden rounded-xl border ${
                        isDark
                          ? "border-white/20 bg-black"
                          : "border-[#dce5f2] bg-[#f7f9fd]"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Enter your username or email"
                        autoComplete="username"
                        className={`w-full bg-transparent px-4 py-3 text-sm outline-none md:text-base ${
                          isDark
                            ? "text-white placeholder:text-white/30"
                            : "text-[#111827] placeholder:text-[#71809a]"
                        }`}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
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
                        autoComplete="current-password"
                        className={`min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none md:text-base ${
                          isDark
                            ? "text-white placeholder:text-white/30"
                            : "text-[#111827] placeholder:text-[#71809a]"
                        }`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
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
                        type="submit"
                        disabled={isLoading}
                        className="m-1 flex h-9 min-w-[82px] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isLoading ? <Loader /> : "Sign in"}
                      </button>
                    </div>
                  </div>
                )}
              </form>

              <p
                className={`mt-4 text-center text-sm ${
                  isDark ? "text-white/70" : "text-[#71809a]"
                }`}
              >
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className={`underline underline-offset-4 ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  Sign up
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
                  onClick={() => {
                    window.location.href = `${api.defaults.baseURL}/auth/google`;
                  }}
                  className={`flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm transition-colors duration-150 ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.07] hover:text-white"
                      : "border-[#dce5f2] bg-[#f1f5fb] text-[#71809a] hover:bg-[#edf3ff] hover:text-[#111827]"
                  }`}
                >
                  <FaGoogle size={14} />
                  Sign in with Google
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `${api.defaults.baseURL}/auth/github`;
                  }}
                  className={`flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm transition-colors duration-150 ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.07] hover:text-white"
                      : "border-[#dce5f2] bg-[#f1f5fb] text-[#71809a] hover:bg-[#edf3ff] hover:text-[#111827]"
                  }`}
                >
                  <FaGithub size={14} />
                  Sign in with GitHub
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

export { Signin };
