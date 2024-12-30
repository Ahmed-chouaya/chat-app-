import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface PhoneEntryStepProps {
  onSubmit?: (phoneNumber: string) => void;
  isLoading?: boolean;
}

const countryCodes = [
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
];

const PhoneEntryStep = ({
  onSubmit = () => {},
  isLoading = false,
}: PhoneEntryStepProps) => {
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const validatePhoneNumber = (number: string) => {
    return /^[0-9]{10}$/.test(number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setError("");
    onSubmit(`${countryCode}${phoneNumber}`);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <div className="bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Enter your phone number
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          We'll send you a verification code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Select
            value={countryCode}
            onValueChange={setCountryCode}
            defaultValue="+1"
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Code" />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.code} {country.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="tel"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setPhoneNumber(value);
              setError("");
            }}
            className="flex-1"
            maxLength={10}
            inputMode="numeric"
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading || phoneNumber.length !== 10}
        >
          {isLoading ? "Sending..." : "Continue"}
        </Button>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default PhoneEntryStep;
