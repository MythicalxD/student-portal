"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

import axios from "axios";

import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Get the email and password from the form
    const emailInput = event.currentTarget.querySelector(
      "#email"
    ) as HTMLInputElement;
    const passwordInput = event.currentTarget.querySelector(
      "#password"
    ) as HTMLInputElement;

    // Sanitize the email and password (replace this with your actual sanitization logic)
    const sanitizedEmail = emailInput.value.trim();
    const sanitizedPassword = passwordInput.value.trim();

    // Make the login request
    try {
      // Call the custom API route (/api/proxy) to fetch data from the server

      const dataToSend = {
        email: sanitizedEmail,
        pass: sanitizedPassword,
      };

      const response = await axios.post("/api/login", dataToSend);

      // Check the response status or any other relevant information from your API
      if (response.status === 200) {
        const data = response.data;

        document.cookie = `session=${data.session}; path=/`;
        document.cookie = `token=${data.token}; path=/`;

        // add email and account type
        localStorage.setItem("email", sanitizedEmail);
        localStorage.setItem("accountType", data.type);

        router.push("/dashboard");

        setIsError(false);
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", response.status);
        setIsLoading(false);
        // Handle login error (e.g., show an error message to the user)
      }
    } catch (error) {
      // Toast here
      setIsError(true);
      setIsLoading(false);
      // Handle login error (e.g., show an error message to the user)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Forgot Password ?
          </p>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
          {isError ? (
            <p className="text-sm text-red-600 text-center">Login Failed !</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
