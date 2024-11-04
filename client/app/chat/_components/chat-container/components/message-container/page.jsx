"use client";

import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constants";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

const MessageContainer = () => {
  const scrollRef = useRef();

  const { userInfo } = useAuth();
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
  } = useChat();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          {
            withCredentials: true,
          }
        );

        if (res.data.messages) {
          setSelectedChatMessages(res.data.messages);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching the messages");
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessage = () => {
    let lastDate = null;
    // console.log(selectedChatMessages);

    return selectedChatMessages?.map((message, index) => {
      const messageDate = moment(message?.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={`${message.id || index}-message`}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message?.timestamp).format("LL")}
            </div>
          )}

          {selectedChatType === "contact" && renderDMMessages(message, index)}
        </div>
      );
    });
  };

  const renderDMMessages = (message, index) => (
    <div
      key={index}
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message?.content}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessage()}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default MessageContainer;
