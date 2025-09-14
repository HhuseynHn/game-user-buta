import { useRef } from "react";
import { useWatch } from "react-hook-form";

export const useOtpInput = (control, setValue, length = 6) => {
  const inputRefs = useRef([]);

  const otpValue = useWatch({
    control,
    name: "otp",
  }) || "";

  const handleChange = (e, index) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // yalnız hərf və rəqəm
    let newOtp = otpValue.split("");

    newOtp[index] = value;
    const finalOtp = newOtp.join("");
    setValue("otp", finalOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return {
    inputRefs,
    otpValue,
    handleChange,
    handleKeyDown,
  };
};
