import React, { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // login | register

  return (
    <AuthLayout>
      {mode === "login" ? (
        <LoginForm switchMode={() => setMode("register")} />
      ) : (
        <RegisterForm switchMode={() => setMode("login")} />
      )}
    </AuthLayout>
  );
}
