"use client";

import React, { useEffect } from "react";
import Logo from "./components/ContactsLogo";
import Title from "./components/Title";
import ProfileInfo from "./profile-info/page";
import NewDM from "./new-dm/page";
import { apiClient } from "@/lib/api-client";
import {
  GET_DM_CONTACTS_ROUTE,
  GET_USER_CHANNELS_ROUTE,
} from "@/utils/constants";
import { useChat } from "@/context/ChatContext";
import ContactList from "@/components/contact-list";
import CreateChannel from "./create-channel/page";
import { useChannel } from "@/context/ChannelContext";
import { toast } from "sonner";
import { ModeToggle } from "@/components/ToggleTheme";

const ContactsContainer = () => {
  const { directMessagesContacts, setDirectMessagesContacts } = useChat();
  const { channels, setChannels } = useChannel();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await apiClient.get(GET_DM_CONTACTS_ROUTE, {
          withCredentials: true,
        });

        if (res.data.contacts) {
          setDirectMessagesContacts(res.data.contacts);
          // console.log(res.data.contacts);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    const getChannels = async () => {
      try {
        const res = await apiClient.get(GET_USER_CHANNELS_ROUTE, {
          withCredentials: true,
        });

        console.log(res.data);

        if (res.data.channels) {
          setChannels(res.data.channels);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    getContacts();
    getChannels();
  }, [setChannels, setDirectMessagesContacts]);

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      {" "}
      {/* <div className="pt-3 pr-3 flex gap-1 justify-between items-center">
        <Logo />
        <ModeToggle />
      </div> */}
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Direct Messages"} />
          <NewDM />
        </div>

        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Channels"} />
          <CreateChannel />
        </div>

        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;
