import Joi from "joi";

export const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
  });

export const passwordSchema = Joi.string()
  .min(8)
  .pattern(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    )
  )
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters long",
    "string.pattern.base":
      "Password must contain uppercase, lowercase, number and special character",
    "string.empty": "Password is required",
  });

export const repeatPasswordSchema = Joi.string()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "Passwords do not match",
    "string.empty": "Please confirm your password",
  });

export const otpSchema = Joi.object({
  otp: Joi.string().alphanum().length(6).required().messages({
    "string.alphanum": "OTP must contain only letters and numbers",
    "string.length": "OTP must be 6 characters long",
    "string.empty": "OTP is required",
  }),
});

export const forgotPasswordSchema = Joi.object({
  email: emailSchema,
});

export const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});


export const resetPasswordSchema = Joi.object({
  repeatPassword: repeatPasswordSchema,
  password: passwordSchema,
});