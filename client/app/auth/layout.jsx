"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Header } from "./_components/Header";

const AuthLayout = ({ children }) => {
  const { userInfo, setUserInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      const cookies = document.cookie.split("; ");
      const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

      if (jwtCookie) {
        if (!userInfo?.profileSetup) {
          toast.error("Please setup profile to continue.");
          router.replace("/profile");
        }
      }
    }
  }, [userInfo, router]);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

    if (jwtCookie) {
      toast.success("You are already logged in!");
      router.push("/chat");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      {children}
    </div>
  );
};

export default AuthLayout;
