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
      if (!userInfo?.profileSetup) {
        toast.error("Please setup profile to continue.");
        router.replace("/profile");
      } else {
        toast.success("You are already logged in!");
        router.push("/chat");
      }
    }
  }, [userInfo, router]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      {children}
    </div>
  );
};

export default AuthLayout;
