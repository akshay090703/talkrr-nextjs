"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/utils/lottieAnimation";
import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_CONTACTS_ROUTE } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/utils/colors";
import { useChat } from "@/context/ChatContext";

const NewDM = () => {
  const { setSelectedChatType, setSelectedChatData } = useChat();

  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const res = await apiClient.post(
          SEARCH_CONTACTS_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );

        if (res.status === 200 && res.data.contacts) {
          setSearchedContacts(res.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModal(false);

    setSelectedChatType("contact");
    setSelectedChatData(contact);

    setSearchedContacts([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-center">
              Please select a contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>

          {/* Contact List */}
          {searchedContacts.length > 0 && (
            <ScrollArea>
              <div className="flex flex-col gap-5">
                {searchedContacts?.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="h-12 w-12 relative">
                      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {contact?.image ? (
                          <AvatarImage
                            src={`${HOST}/${contact?.image}`}
                            alt="profile image"
                            className="object-cover w-full h-full bg-black"
                          />
                        ) : (
                          <div
                            className={`uppercase h-12 w-12 text-lg border flex justify-center items-center rounded-full ${getColor(
                              contact?.color
                            )}`}
                          >
                            {contact?.firstName
                              ? contact?.firstName.split("").shift()
                              : contact?.email.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                    </div>

                    <div className="flex flex-col">
                      <span>
                        {contact?.firstName && contact?.lastName
                          ? `${contact?.firstName} ${contact?.lastName}`
                          : contact?.email}
                      </span>
                      <span className="text-sm">{contact?.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {searchedContacts.length <= 0 && (
            <div className="flex-1 mt-5 md:mt-0 md:flex flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />

              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
                <h3 className="poppins-medium">
                  Search new
                  <span className="text-primary"> Contact. </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
