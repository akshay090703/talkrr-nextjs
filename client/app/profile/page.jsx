"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const { userInfo, setUserInfo } = useAuth();

  return (
    <div>
      Profile
      <div className="">Email: {userInfo?.email}</div>
    </div>
  );
};

export default ProfilePage;
