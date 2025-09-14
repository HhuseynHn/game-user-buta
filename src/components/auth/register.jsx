"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react";
import { registerSchema } from "@/schemas/auth-schema";
import Link from "next/link";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Register data:", data);

    try {
      setTimeout(() => {
        setIsLoading(false);
        alert(
          "Registration successful! Please check your email for verification."
        );
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      console.error("Registration error:", error);
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
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Join our gaming community today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full bg-gray-800 border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full bg-gray-800 border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </p>
              )}

              {/* Password Strength Indicator */}
              {watch("password") && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(4)].map((_, i) => {
                      const password = watch("password") || "";
                      let strength = 0;
                      if (password.length >= 8) strength++;
                      if (/[A-Z]/.test(password)) strength++;
                      if (/[a-z]/.test(password)) strength++;
                      if (/\d/.test(password)) strength++;
                      if (/[@$!%*?&]/.test(password)) strength++;

                      return (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded ${
                            i < strength
                              ? strength <= 2
                                ? "bg-red-500"
                                : strength <= 3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                              : "bg-gray-600"
                          }`}
                        />
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-400">
                    Password strength:{" "}
                    {(() => {
                      const password = watch("password") || "";
                      let strength = 0;
                      if (password.length >= 8) strength++;
                      if (/[A-Z]/.test(password)) strength++;
                      if (/[a-z]/.test(password)) strength++;
                      if (/\d/.test(password)) strength++;
                      if (/[@$!%*?&]/.test(password)) strength++;

                      if (strength <= 2) return "Weak";
                      if (strength <= 3) return "Medium";
                      if (strength <= 4) return "Strong";
                      return "Very Strong";
                    })()}
                  </p>
                </div>
              )}
            </div>

            {/* Terms and Privacy */}
            <div className="text-xs text-gray-400 leading-relaxed">
              By creating an account, you agree to our{" "}
              <a
                href="#"
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Privacy Policy
              </a>
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="text-red-400 hover:text-red-300 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
