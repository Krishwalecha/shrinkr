import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Loader from "@/components/loader.jsx";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import authBg from "@/assets/auth-background.webp";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

const Signin = () => {
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#131416] p-3 text-white">
      <div className="grid min-h-[calc(100vh-24px)] overflow-hidden rounded-2xl border border-white/10 xl:grid-cols-2">
        {/* Image */}
        <div
          className="hidden bg-cover bg-center xl:block"
          style={{ backgroundImage: `url(${authBg})` }}
        />

        {/* Form */}
        <div className="flex min-h-full flex-col bg-[#111214] p-6 md:px-10 md:py-8">
          <div>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-white/60 transition-colors duration-150 hover:bg-white/5 hover:text-white"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            <div className="mt-3 text-xl font-semibold tracking-tight">
              shrinkr.
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-md">
              <div className="text-center">
                <h1 className="text-3xl font-medium tracking-[-0.04em]">
                  Welcome back!
                </h1>

                <p className="mt-2 text-sm text-white/45">
                  Sign in for URL history and detailed analytics.
                </p>
              </div>

              <div className="mt-7">
                {step === 1 ? (
                  <div className="flex overflow-hidden rounded-xl border border-white/20 bg-black">
                    <input
                      type="text"
                      placeholder="Enter your username or email"
                      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 md:text-base"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      autoFocus
                    />

                    <button
                      type="button"
                      onClick={() =>
                        identifier.trim()
                          ? setStep(2)
                          : toast.error(
                              "Please enter a valid email or username",
                            )
                      }
                      className="m-1 shrink-0 cursor-pointer rounded-lg bg-white px-4 text-sm font-medium text-black transition-colors duration-150 hover:bg-white/90"
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="overflow-hidden rounded-xl border border-white/20 bg-black">
                      <input
                        type="text"
                        placeholder="Enter your username or email"
                        className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 md:text-base"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center overflow-hidden rounded-xl border border-white/20 bg-black">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 md:text-base"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white/40 transition-colors hover:text-white/80"
                      >
                        {showPassword ? (
                          <EyeOff strokeWidth={1.5} size={19} />
                        ) : (
                          <Eye strokeWidth={1.5} size={19} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="m-1 flex h-9 min-w-[82px] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-black transition-colors duration-150 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isLoading ? <Loader /> : "Sign in"}
                      </button>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-center text-sm text-white/70">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-white underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </p>

                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] text-white/30">OR</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white/75 transition-colors duration-150 hover:bg-white/[0.07] hover:text-white"
                  >
                    <FaGoogle size={14} />
                    Sign in with Google
                  </button>

                  <button
                    type="button"
                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white/75 transition-colors duration-150 hover:bg-white/[0.07] hover:text-white"
                  >
                    <FaGithub size={14} />
                    Sign in with GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-white/30">
            <Link to="/terms" className="transition-colors hover:text-white/60">
              Terms of Service
            </Link>

            <Link
              to="/privacy"
              className="transition-colors hover:text-white/60"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Signin };
