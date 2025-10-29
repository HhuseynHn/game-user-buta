"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { KeyRound, AlertCircle } from "lucide-react";
import { otpSchema } from "@/schemas/auth-schema";
import { useOtpInput } from "@/hooks/use-otp-input";
import { useTranslation } from "@/hooks/use-translations";

const OtpVerification = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    resolver: joiResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const { inputRefs, otpValue, handleChange, handleKeyDown } = useOtpInput(control, setValue, 6);


  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("OTP data:", data);

    setTimeout(() => {
      setIsLoading(false);
      alert("OTP verified successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t("otpVerification")}
            </h1>
            <p className="text-gray-400">
              {t("enterCode")}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-between gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={otpValue[index] || ""}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-12 h-14 text-center text-xl font-semibold rounded-lg border-2 ${errors.otp ? "border-red-500" : "border-gray-700"
                    } bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="mt-2 text-sm text-red-400 flex items-center justify-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.otp.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("verifying")}
                </>
              ) : (
                t("verifyOtp")
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
