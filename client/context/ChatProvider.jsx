"use client";

import React, { useState } from "react";
import { ChatContext } from "./ChatContext";

const ChatProvider = ({ children }) => {
  const [selectedChatType, setSelectedChatType] = useState(undefined);
  const [selectedChatData, setSelectedChatData] = useState(undefined);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);

  const closeChat = () => {
    setSelectedChatType(undefined);
    setSelectedChatData(undefined);
    setSelectedChatMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChatType,
        selectedChatData,
        selectedChatMessages,
        setSelectedChatType,
        setSelectedChatData,
        setSelectedChatMessages,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
