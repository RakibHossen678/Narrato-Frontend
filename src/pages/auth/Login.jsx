import toast from "react-hot-toast";
import apiRequestHandler from "../../services/ApiRequestHandler";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion as Motion } from "framer-motion";
import PageTransition from "../../components/common/animations/PageTransition";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planName = searchParams.get("plan_name");
  const billingCycle = searchParams.get("billing_cycle");
  const [showPassword, setShowPassword] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequestHandler("/auth/login", "POST", data);
      return response;
    },

    onSuccess: async (data) => {
      const token = data?.data?.token;
      const user = data?.data?.user;

      if (!token) return;
      if (user?.isVerified === false) {
        toast.error("Please verify your email before logging in.");
        return;
      }

      toast.success("Sign in successfully completed");

      // Save user and token
      login(user, token);

      // Default redirect
      navigate("/");
      reset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Sign in failed");
    },
  });

  const onSubmit = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <PageTransition>
      <section className="auth-shell">
        <Motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="auth-title">Log in</h1>
          <p className="auth-subtitle mt-2">
            Continue writing, reading, and connecting with your audience.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="auth-label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="auth-input"
              />
              {errors.email && (
                <p className="text-danger mt-1 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="auth-label" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="auth-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-300 hover:text-white"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-danger mt-1 text-xs">
                  {errors.password.message}
                </p>
              )}
              <Link
                to="/forget-password"
                className="muted-link mt-2 inline-block text-sm"
              >
                Forget Password?
              </Link>
            </div>

            <button
              type="submit"
              className="focus-ring mt-2 w-full rounded-xl bg-teal-500 py-3 text-sm font-semibold text-[#032722] hover:bg-teal-400"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Signing In..." : "Sign In"}
            </button>

            <div className="flex items-center gap-3 pt-1">
              <span className="h-px flex-1 bg-[#2a3958]" />
              <span className="text-xs text-slate-400">or</span>
              <span className="h-px flex-1 bg-[#2a3958]" />
            </div>

            <p className="mx-auto max-w-[280px] text-center text-sm text-slate-300">
              By continuing you agree to the{" "}
              <span className="text-cyan-200 underline">Privacy Policy</span>{" "}
              and{" "}
              <span className="text-cyan-200 underline">Terms & Condition</span>
            </p>

            <p className="text-center text-sm text-slate-300">
              Don&apos;t have an account?{" "}
              {searchParams.get("plan_name") ? (
                <Link
                  to={`/register?plan_name=${planName}&billing_cycle=${
                    billingCycle || "monthly"
                  }`}
                  className="text-cyan-200 underline"
                >
                  Sign Up
                </Link>
              ) : (
                <Link to="/register" className="text-cyan-200 underline">
                  Sign Up
                </Link>
              )}
            </p>
          </form>
        </Motion.div>
      </section>
    </PageTransition>
  );
};

export default Login;
