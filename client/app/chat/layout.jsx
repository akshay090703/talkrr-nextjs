"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const ChatLayout = ({ children }) => {
  const router = useRouter();
  const { userInfo } = useAuth();

  useEffect(() => {
    if (!userInfo) {
      toast.error("Please login to use the app!");
      router.push("/auth");
    }

    if (!userInfo?.profileSetup) {
      toast.error("Please setup profile to continue.");
      router.replace("/profile");
    }
  }, [userInfo, router]);

  return <div>{children}</div>;
};

export default ChatLayout;
