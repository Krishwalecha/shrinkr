import { Link, useNavigate } from "react-router-dom";
import authBg from "@/assets/auth-background.webp";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useState } from "react";
import Loader from "@/components/loader.jsx";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const SignUp = () => {
  const navigate = useNavigate();

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

          <div className="flex flex-1 items-center justify-center py-8">
            <div className="w-full max-w-md">
              <div className="text-center">
                <h1 className="text-3xl font-medium tracking-[-0.04em]">
                  Welcome!
                </h1>

                <p className="mt-2 text-sm text-white/45">
                  Sign up for URL history and detailed analytics.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2">
                <div className="overflow-hidden rounded-xl border border-white/20 bg-black">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 md:text-base"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="overflow-hidden rounded-xl border border-white/20 bg-black">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 md:text-base"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="overflow-hidden rounded-xl border border-white/20 bg-black">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 md:text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex items-center overflow-hidden rounded-xl border border-white/20 bg-black">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 md:text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    onClick={handleSignUp}
                    disabled={isLoading}
                    className="m-1 flex h-9 min-w-[82px] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-black transition-colors duration-150 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? <Loader /> : "Sign Up"}
                  </button>
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-white/70">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-white underline underline-offset-4"
                >
                  Sign in
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
                  Sign up with Google
                </button>

                <button
                  type="button"
                  className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white/75 transition-colors duration-150 hover:bg-white/[0.07] hover:text-white"
                >
                  <FaGithub size={14} />
                  Sign up with GitHub
                </button>
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

export { SignUp };
