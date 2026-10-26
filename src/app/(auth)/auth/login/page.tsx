import React, { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Sign In | Electro",
  description: "Sign in to your account to access your Electro dashboard and store settings.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--surface-alt)] dark:bg-[var(--surface-alt)]" />}>
      <LoginForm />
    </Suspense>
  );
}
