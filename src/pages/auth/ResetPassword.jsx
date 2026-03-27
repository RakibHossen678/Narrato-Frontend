import { useForm } from "react-hook-form";
import apiRequestHandler from "../../services/ApiRequestHandler";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion as Motion } from "framer-motion";
import PageTransition from "../../components/common/animations/PageTransition";

const ResetPassword = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequestHandler(
        "/auth/reset-password",
        "POST",
        data,
      );
      return response;
    },

    onSuccess: async (data) => {
      if (data?.success) {
        toast.success("Password Reset Successfully");
        localStorage.removeItem("email");
        navigate("/login");
        reset();
      } else {
        toast.error(data?.message || "Failed to reset password");
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

  const onSubmit = async (data) => {
    if (!email) {
      toast.error("Email session missing. Please request OTP again.");
      navigate("/forgot-password");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    if (data.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    const resetPassData = {
      email: email,
      newPassword: data.newPassword,
    };
    await mutation.mutateAsync(resetPassData);
  };

  return (
    <PageTransition>
      <section className="auth-shell">
        <Motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="auth-card max-w-md"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="auth-title text-[1.45rem] md:text-[1.75rem]">
            Reset Password
          </h1>
          <p className="auth-subtitle py-3 md:py-4">
            Set a strong new password for your account.
          </p>
          <hr className="auth-divider mb-6 md:mb-8" />

          <div className="mb-3">
            <label className="auth-label" htmlFor="newPassword">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                {...register("newPassword", {
                  required: "New Password is required",
                })}
                className="auth-input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide new password" : "Show new password"
                }
                className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-300 hover:text-white"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-danger mt-1 text-xs">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="mb-6 md:mb-8">
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

          <button
            type="submit"
            className="focus-ring w-full rounded-xl bg-teal-500 py-3 text-sm font-semibold text-[#032722] hover:bg-teal-400"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Sending..." : "Send"}
          </button>
        </Motion.form>
      </section>
    </PageTransition>
  );
};

export default ResetPassword;
