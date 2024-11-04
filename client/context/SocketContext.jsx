"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { io } from "socket.io-client";
import { HOST } from "@/utils/constants";
import { useChat } from "./ChatContext";

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo } = useAuth();
  const { selectedChatType, selectedChatData, addMessage } = useChat();

  // Create refs to store the latest values
  const selectedChatTypeRef = useRef(selectedChatType);
  const selectedChatDataRef = useRef(selectedChatData);

  // Update refs whenever context values change
  useEffect(() => {
    selectedChatTypeRef.current = selectedChatType;
    selectedChatDataRef.current = selectedChatData;
  }, [selectedChatType, selectedChatData]);

  useEffect(() => {
    if (userInfo) {
      const newSocket = io(HOST, {
        withCredentials: true,
        query: {
          userId: userInfo.id,
        },
      });

      newSocket.on("connect", () => {
        console.log("Connected to the socket server");
      });

      setSocket(newSocket);

      const handleReceiveMessage = (message) => {
        if (
          selectedChatTypeRef.current !== undefined &&
          (selectedChatDataRef.current._id === message.sender._id ||
            selectedChatDataRef.current._id === message.recipient._id)
        ) {
          console.log("Message received:", message);
          addMessage(message);
        }
      };

      newSocket.on("receiveMessage", handleReceiveMessage);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [userInfo, addMessage]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
