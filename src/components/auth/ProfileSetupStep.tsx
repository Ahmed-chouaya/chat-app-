import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface ProfileSetupStepProps {
  onSubmit?: (data: { firstName: string; lastName: string }) => void;
  isLoading?: boolean;
}

const ProfileSetupStep = ({
  onSubmit = () => {},
  isLoading = false,
}: ProfileSetupStepProps) => {
  const [firstName, setFirstName] = React.useState("John");
  const [lastName, setLastName] = React.useState("Doe");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ firstName, lastName });
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 space-y-6 bg-white dark:bg-gray-800">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Complete Your Profile
        </h2>
        <p className="text-muted-foreground">
          Please enter your name to complete the setup
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Setting up..." : "Complete Setup"}
        </Button>
      </form>
    </Card>
  );
};

export default ProfileSetupStep;
