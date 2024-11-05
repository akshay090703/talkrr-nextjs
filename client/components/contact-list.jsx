"use client";

import { useChat } from "@/context/ChatContext";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/utils/colors";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    selectedChatType,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useChat();

  const handleClick = (contact) => {
    if (isChannel) {
      setSelectedChatType("channel");
    } else {
      setSelectedChatType("contact");
    }

    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff]/40 hover:bg-[#8417ff]/60"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <div className="flex gap-4 justify-center items-center">
                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                  {contact?.image ? (
                    <AvatarImage
                      src={`${HOST}/${contact?.image}`}
                      alt="profile image"
                      className="object-cover w-full h-full bg-black"
                    />
                  ) : (
                    <div
                      className={` ${
                        selectedChatData && selectedChatData._id === contact._id
                          ? "bg-[#ffffff22] border-2 border-white/70"
                          : getColor(contact?.color)
                      }
                        uppercase h-10 w-10 text-lg border flex justify-center items-center rounded-full `}
                    >
                      {contact?.firstName
                        ? contact?.firstName.split("").shift()
                        : contact?.email.split("").shift()}
                    </div>
                  )}
                </Avatar>
              </div>
            )}

            {isChannel && (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span>
                {contact?.firstName
                  ? `${contact?.firstName} ${contact?.lastName}`
                  : contact?.email}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
