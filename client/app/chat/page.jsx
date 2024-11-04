"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import ContactsContainer from "./_components/contacts-container/page";
import EmptyChatContainer from "./_components/empty-chat-container/page";
import ChatContainer from "./_components/chat-container/page";
import { useChat } from "@/context/ChatContext";
import { useLoading } from "@/context/LoadingProvider";

const ChatPage = () => {
  const { userInfo } = useAuth();
  const { selectedChatType, selectedChatData } = useChat();
  const {
    isUploading,
    isDownloading,
    fileUploadProgess,
    fileDownloadProgress,
  } = useLoading();

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      {isUploading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop:blur-lg">
          <h5 className="text-5xl animate-pulse">Uploading File</h5>
          {fileUploadProgess}%
        </div>
      )}
      {isDownloading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop:blur-lg">
          <h5 className="text-5xl animate-pulse">Downloading File</h5>
          {fileDownloadProgress}%
        </div>
      )}
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
