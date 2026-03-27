import { useForm } from "react-hook-form";
import apiRequestHandler from "../../services/ApiRequestHandler";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { motion as Motion } from "framer-motion";
import PageTransition from "../../components/common/animations/PageTransition";

const ForgotPassword = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequestHandler(
        "/auth/forgot-password",
        "POST",
        data,
      );
      return response;
    },

    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success("OTP Sent to your email successfully. Please check.");
        localStorage.setItem("email", variables.email);
        navigate("/verify-otp");
        reset();
      } else {
        toast.error(data?.message || "Failed to send OTP");
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
    await mutation.mutateAsync(data);
  };

  return (
    <PageTransition>
      <section className="auth-shell">
        <Motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="auth-card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="auth-title text-[1.45rem] md:text-[1.75rem]">
            Forget Password
          </h1>
          <p className="auth-subtitle py-3 md:py-4">
            Enter your email, and we&apos;ll send you simple steps to reset your
            password.
          </p>
          <hr className="auth-divider mb-6 md:mb-8" />

          <div className="mb-5">
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
              <p className="text-danger mt-1 text-xs">{errors.email.message}</p>
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

export default ForgotPassword;
