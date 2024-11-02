"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";

const ChatPage = () => {
  const { userInfo } = useAuth();

  return <div>Chat</div>;
};

export default ChatPage;
