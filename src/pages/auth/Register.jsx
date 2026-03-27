import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import apiRequestHandler from "../../services/ApiRequestHandler";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion as Motion } from "framer-motion";
import PageTransition from "../../components/common/animations/PageTransition";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await apiRequestHandler(
        "/auth/register",
        "POST",
        userData,
      );
      return response;
    },
    onSuccess: (data) => {
      const token = data?.data?.token;
      const user = data?.data?.user;

      if (data?.success && token && user) {
        toast.success("Registered Successfully");
        login(user, token);
        navigate("/dashboard");
        reset();
      } else {
        toast.error(data?.message || "Registration failed");
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  const onSubmit = (data) => {
    if (!recaptchaToken) {
      toast.error("Please verify that you're not a robot");
      return;
    }

    if (data?.password !== data?.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    const normalizedEmail = String(data?.email || "")
      .trim()
      .toLowerCase();
    const generatedUserName = `${normalizedEmail.split("@")[0] || "user"}${Date.now()
      .toString()
      .slice(-5)}`;

    const userData = {
      userName: generatedUserName,
      email: normalizedEmail,
      password: data?.password,
      recaptchaToken,
    };

    registerMutation.mutate(userData);
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
          <h1 className="auth-title text-[1.45rem] md:text-[1.75rem]">
            Create Account
          </h1>
          <p className="auth-subtitle mt-2">
            Start your publishing journey with Narrato.
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
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
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
            </div>

            <div>
              <label className="auth-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                  className="auth-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-300 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-danger mt-1 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="mt-2 flex justify-center rounded-xl border border-[#2a3958] bg-[#0d1830] p-3">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => setRecaptchaToken(token)}
              />
            </div>

            <button
              type="submit"
              className="focus-ring mt-2 w-full rounded-xl bg-teal-500 py-3 text-sm font-semibold text-[#032722] hover:bg-teal-400"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creating..." : "Create Account"}
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
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-200 underline">
                Sign in
              </Link>
            </p>
          </form>
        </Motion.div>
      </section>
    </PageTransition>
  );
};

export default Register;
