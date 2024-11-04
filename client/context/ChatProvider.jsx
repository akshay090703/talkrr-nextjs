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

  const addMessage = (message) => {
    setSelectedChatMessages([
      ...selectedChatMessages,
      {
        ...message,
        recipient:
          selectedChatType === "channel"
            ? message.recipient
            : message.recipient._id,
        sender:
          selectedChatType === "channel" ? message.sender : message.sender._id,
      },
    ]);
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
        addMessage,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
