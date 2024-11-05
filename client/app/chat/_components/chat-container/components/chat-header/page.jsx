import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "@/context/ChatContext";
import { getColor } from "@/utils/colors";
import { HOST } from "@/utils/constants";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useChat();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="h-12 w-12 relative">
            {selectedChatType === "contact" ? (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData?.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData?.image}`}
                    alt="profile image"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 text-lg border flex justify-center items-center rounded-full ${getColor(
                      selectedChatData?.color
                    )}`}
                  >
                    {selectedChatData?.firstName
                      ? selectedChatData?.firstName.split("").shift()
                      : selectedChatData?.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="bg-[#ffffff22] h-12 w-12 rounded-full overflow-hidden flex items-center justify-center">
                #
              </div>
            )}
          </div>

          <div>
            {selectedChatType === "channel" && selectedChatData?.name}
            {selectedChatType === "contact" && selectedChatData?.firstName
              ? `${selectedChatData?.firstName} ${selectedChatData?.lastName}`
              : selectedChatData?.email}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
