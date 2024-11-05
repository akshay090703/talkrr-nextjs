"use client";

import React, { useState } from "react";
import { ChatContext } from "./ChatContext";
import { useAuth } from "./AuthContext";

const ChatProvider = ({ children }) => {
  const [selectedChatType, setSelectedChatType] = useState(undefined);
  const [selectedChatData, setSelectedChatData] = useState(undefined);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const [directMessagesContacts, setDirectMessagesContacts] = useState([]);

  const { userInfo } = useAuth();

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

  const addContactsInDMContacts = (message) => {
    const userId = userInfo.id;
    const fromId =
      message.sender._id === userId
        ? message.recipient._id
        : message.sender._id;

    const fromData =
      message.sender._id === userId ? message.recipient : message.sender;

    const dmContacts = directMessagesContacts;
    const data = dmContacts.find((contact) => contact._id === fromId);
    const index = dmContacts.findIndex((contact) => contact._id === fromId);

    if (index !== -1 && index !== undefined) {
      dmContacts.splice(index, 1);
      dmContacts.unshift(data);
    } else {
      dmContacts.unshift(fromData);
    }

    setDirectMessagesContacts(dmContacts);
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChatType,
        selectedChatData,
        selectedChatMessages,
        directMessagesContacts,
        setSelectedChatType,
        setSelectedChatData,
        setSelectedChatMessages,
        setDirectMessagesContacts,
        addMessage,
        closeChat,
        addContactsInDMContacts,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
