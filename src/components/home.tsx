import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneEntryStep from "./auth/PhoneEntryStep";
import OTPVerificationStep from "./auth/OTPVerificationStep";
import ProfileSetupStep from "./auth/ProfileSetupStep";
import AuthStepIndicator from "./auth/AuthStepIndicator";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const handlePhoneSubmit = (phone: string) => {
    setLoading(true);
    setPhoneNumber(phone);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(1);
      toast({
        title: "Verification code sent",
        description: `We've sent a code to ${phone}`,
      });
    }, 1000);
  };

  const handleOTPVerify = (otp: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(2);
      toast({
        title: "Phone verified",
        description: "Please complete your profile",
      });
    }, 1000);
  };

  const handleResendOTP = () => {
    toast({
      title: "Code resent",
      description: `We've sent a new code to ${phoneNumber}`,
    });
  };

  const handleProfileSubmit = (data: {
    firstName: string;
    lastName: string;
  }) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome!",
        description: `Account created successfully, ${data.firstName}!`,
        variant: "success",
      });
      // Redirect to chat after successful authentication
      navigate("/chat");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <AuthStepIndicator currentStep={currentStep} />

        <div className="p-6">
          {currentStep === 0 && (
            <PhoneEntryStep onSubmit={handlePhoneSubmit} isLoading={loading} />
          )}
          {currentStep === 1 && (
            <OTPVerificationStep
              onVerify={handleOTPVerify}
              loading={loading}
              onResendOTP={handleResendOTP}
            />
          )}
          {currentStep === 2 && (
            <ProfileSetupStep
              onSubmit={handleProfileSubmit}
              isLoading={loading}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Home;
