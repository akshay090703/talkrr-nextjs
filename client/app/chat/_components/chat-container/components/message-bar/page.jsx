"use client";

import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { useLoading } from "@/context/LoadingProvider";
import { useSocket } from "@/context/SocketContext";
import { apiClient } from "@/lib/api-client";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import EmojiPicker from "emoji-picker-react";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { toast } from "sonner";

const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();

  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const { theme } = useTheme();
  const { userInfo } = useAuth();
  const { selectedChatType, selectedChatData } = useChat();
  const socket = useSocket();
  const { setIsUploading, setFileUploadProgress } = useLoading();

  // console.log(socket);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji?.emoji);
  };

  const handleSendMessage = async () => {
    // console.log(selectedChatData);

    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    } else if (selectedChatType === "channel") {
      socket.emit("send-channel-message", {
        sender: userInfo.id,
        content: message,
        messageType: "text",
        fileUrl: undefined,
        channelId: selectedChatData._id,
      });
    }

    setMessage("");
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);

        const res = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
          onUploadProgress: (data) => {
            setFileUploadProgress(Math.round(100 * data?.loaded) / data.total);
          },
        });

        if (res.status === 200 && res.data) {
          setIsUploading(false);
          setFileUploadProgress(0);
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: res.data.filePath,
            });
          } else if (selectedChatType === "channel") {
            socket.emit("send-channel-message", {
              sender: userInfo.id,
              content: undefined,
              messageType: "file",
              fileUrl: res.data.filePath,
              channelId: selectedChatData._id,
            });
          }
        }
      }

      // console.log({ file });
    } catch (error) {
      setIsUploading(false);
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className="h-[10vh] b-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6 ">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={handleAttachmentClick}
        >
          <GrAttachment className="text-xl" />
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => handleAttachmentChange(e)}
        />

        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onFocus={() => setEmojiPickerOpen((prev) => !prev)}
          >
            <RiEmojiStickerLine className="text-xl" />
          </button>

          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme={theme}
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>

      <button
        className="bg-primary rounded-md flex items-center justify-center p-5 hover:bg-[#7e22ce]  focus:bg-[#7e22ce] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="text-xl" />
      </button>
    </div>
  );
};

export default MessageBar;
