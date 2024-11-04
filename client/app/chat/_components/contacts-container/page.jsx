"use client";

import React, { useEffect } from "react";
import Logo from "./components/ContactsLogo";
import Title from "./components/Title";
import ProfileInfo from "./profile-info/page";
import NewDM from "./new-dm/page";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTE } from "@/utils/constants";
import { useChat } from "@/context/ChatContext";
import ContactList from "@/components/contact-list";
import CreateChannel from "./create-channel/page";

const ContactsContainer = () => {
  const { directMessagesContacts, setDirectMessagesContacts } = useChat();

  useEffect(() => {
    const getContacts = async () => {
      const res = await apiClient.get(GET_DM_CONTACTS_ROUTE, {
        withCredentials: true,
      });

      if (res.data.contacts) {
        setDirectMessagesContacts(res.data.contacts);
        // console.log(res.data.contacts);
      }
    };

    getContacts();
  }, []);

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      {" "}
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
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;
