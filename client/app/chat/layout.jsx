"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Header } from "../auth/_components/Header";

const ChatLayout = ({ children }) => {
  const router = useRouter();
  const { userInfo } = useAuth();

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

    if (jwtCookie && !userInfo?.profileSetup) {
      toast.error("Please setup profile to continue.");
      router.replace("/profile");
    }
  }, [userInfo, router]);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

    if (!jwtCookie) {
      toast.error("Please login to use the app!");
      router.push("/auth");
    }
  }, []);

  return <div>{children}</div>;
};

export default ChatLayout;
