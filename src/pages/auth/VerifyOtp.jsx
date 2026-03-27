import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import apiRequestHandler from "../../services/ApiRequestHandler";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { motion as Motion } from "framer-motion";
import PageTransition from "../../components/common/animations/PageTransition";

const VerifyOtp = () => {
  const { handleSubmit, reset, control, setValue, trigger } = useForm();

  const inputsRef = useRef([]);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequestHandler(
        "/auth/verify-otp",
        "POST",
        data,
      );
      return response;
    },

    onSuccess: async (data) => {
      if (data?.success === true) {
        toast.success("Otp verified successfully");
        navigate("/reset-password");
        reset();
      } else {
        toast.error(data?.message || "Invalid OTP");
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

    const code = Object.values(data).join("");
    if (code.length !== 6) {
      toast.error("Please enter a valid code");
      return;
    }
    const verifyData = { email, otp: code };

    // navigate("/reset-password");
    await mutation.mutateAsync(verifyData);
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      setValue(`digit${index + 1}`, value);
      trigger(`digit${index + 1}`);
      if (index + 1 < 6) {
        inputsRef.current[index + 1]?.focus();
      }
    } else {
      setValue(`digit${index + 1}`, "");
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const paste = e.clipboardData?.getData("text") || "";
    const digits = paste.replace(/\D/g, "").slice(0, 6 - index);
    if (!digits) return;

    for (let i = 0; i < digits.length; i++) {
      const pos = index + i;
      setValue(`digit${pos + 1}`, digits[i]);
      trigger(`digit${pos + 1}`);
    }

    const focusIndex = Math.min(index + digits.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <PageTransition>
      <section className="auth-shell px-4">
        <Motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="auth-card max-w-md"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="auth-title mb-3 text-center text-[1.45rem] md:text-[1.75rem]">
            Verify your OTP
          </h2>
          <p className="auth-subtitle mb-7 text-center">
            We just sent a 6-digit code to <br />
            <span className="text-slate-200">{email}</span>, enter it below
          </p>
          <p className="auth-label mb-2">Code</p>

          <div className="mb-2 flex items-center justify-center gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center">
                <Controller
                  name={`digit${index + 1}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      {...field}
                      ref={(el) => (inputsRef.current[index] = el)}
                      maxLength={1}
                      inputMode="numeric"
                      onChange={(e) => handleInput(e, index)}
                      onPaste={(e) => handlePaste(e, index)}
                      className="auth-input h-[46px] w-[40px] px-0 text-center text-xl sm:h-[52px] sm:w-[48px]"
                      aria-label={`OTP digit ${index + 1}`}
                    />
                  )}
                />
                {index === 2 && (
                  <span className="mx-1 text-sm text-slate-500">-</span>
                )}
              </div>
            ))}
          </div>

          <p className="text-danger mt-2 text-xs">This field is required</p>

          <p className="my-6 text-center text-xs text-slate-400">
            Don&apos;t see a code?{" "}
            <button
              type="button"
              onClick={() => alert("Resent!")}
              className="text-cyan-200 font-medium"
            >
              Resend to email
            </button>
          </p>

          <button
            type="submit"
            className="focus-ring w-full rounded-xl bg-teal-500 py-3 text-sm font-semibold text-[#032722] hover:bg-teal-400"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Verifying..." : "Verify OTP"}
          </button>
        </Motion.form>
      </section>
    </PageTransition>
  );
};

export default VerifyOtp;
