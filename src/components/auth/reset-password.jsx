"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";
import { resetPasswordSchema } from "@/schemas/auth-schema";
import { useTranslation } from "@/hooks/use-translations";


const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: joiResolver(resetPasswordSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Reset Password data:", data);

    try {
      setTimeout(() => {
        setIsLoading(false);
        alert("Your password has been reset successfully!");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{t("resetPassword")}</h1>
            <p className="text-gray-400">{t("enterNewPassword")}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t("newPassword")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full bg-gray-800 border ${errors.password ? "border-red-500" : "border-gray-700"
                    } rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                  placeholder={t("enterNewPasswordPlaceholder")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t("confirmPassword")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  {...register("repeatPassword")}
                  className={`w-full bg-gray-800 border ${errors.repeatPassword ? "border-red-500" : "border-gray-700"
                    } rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                  placeholder={t("confirmNewPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showRepeatPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.repeatPassword && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.repeatPassword.message}
                </p>
              )}

              {/* Password Match Indicator */}
              {watch("repeatPassword") && watch("password") && (
                <div className="mt-2">
                  <p className={`text-xs flex items-center gap-1 ${watch("password") === watch("repeatPassword")
                    ? "text-green-400"
                    : "text-red-400"
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${watch("password") === watch("repeatPassword")
                      ? "bg-green-400"
                      : "bg-red-400"
                      }`} />
                    {watch("password") === watch("repeatPassword")
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("resettingPassword")}
                </>
              ) : (
                t("resetPassword")
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
