"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const ProfileLayout = ({ children }) => {
  const router = useRouter();
  const { userInfo } = useAuth();

  useEffect(() => {
    if (!userInfo) {
      toast.error("Please login to use the app!");
      router.push("/auth");
    }
  }, [userInfo, router]);

  return <div>{children}</div>;
};

export default ProfileLayout;
