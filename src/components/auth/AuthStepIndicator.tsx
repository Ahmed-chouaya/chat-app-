import React from "react";
import { Check } from "lucide-react";

interface AuthStepIndicatorProps {
  currentStep?: number;
  totalSteps?: number;
  stepTitles?: string[];
}

const AuthStepIndicator = ({
  currentStep = 0,
  totalSteps = 3,
  stepTitles = ["Phone Number", "Verification", "Profile"],
}: AuthStepIndicatorProps) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  index < currentStep
                    ? "bg-blue-600 text-white"
                    : index === currentStep
                      ? "border-2 border-blue-600 text-blue-600"
                      : "border-2 border-gray-300 text-gray-300"
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`text-xs mt-1 ${index === currentStep ? "text-blue-600 font-medium" : "text-gray-500"}`}
              >
                {stepTitles[index]}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors duration-200 ${index < currentStep ? "bg-blue-600" : "bg-gray-300"}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AuthStepIndicator;
