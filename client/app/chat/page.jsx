"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import ContactsContainer from "./_components/contacts-container/page";
import EmptyChatContainer from "./_components/empty-chat-container/page";
import ChatContainer from "./_components/chat-container/page";
import { useChat } from "@/context/ChatContext";

const ChatPage = () => {
  const { userInfo } = useAuth();
  const { selectedChatType, selectedChatData } = useChat();

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactsContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default ChatPage;
