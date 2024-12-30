import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer, ArrowRight } from "lucide-react";

interface OTPVerificationStepProps {
  onVerify?: (otp: string) => void;
  onResendOTP?: () => void;
  loading?: boolean;
  error?: string;
}

const OTPVerificationStep = ({
  onVerify = () => {},
  onResendOTP = () => {},
  loading = false,
  error = "",
}: OTPVerificationStepProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length === 4) {
      onVerify(otpString);
    }
  };

  const handleResend = () => {
    if (canResend) {
      onResendOTP();
      setResendTimer(60);
      setCanResend(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 bg-white dark:bg-gray-800">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Verify OTP
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter the 4-digit code sent to your phone
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={inputRefs[index]}
            className="w-12 h-12 text-center text-2xl"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        ))}
      </div>

      {error && <p className="text-sm text-center text-red-500">{error}</p>}

      <div className="space-y-4">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleVerify}
          disabled={loading || otp.some((digit) => !digit)}
        >
          {loading ? "Verifying..." : "Verify"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Timer className="h-4 w-4" />
            <span>
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Resend OTP
                </button>
              ) : (
                `Resend in ${resendTimer}s`
              )}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OTPVerificationStep;
