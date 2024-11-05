"use client";

import { createContext, useContext, useState } from "react";

export const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);

  const addChannel = (channel) => {
    setChannels([channel, ...channels]);
  };

  const addChannelInChannelList = (message) => {
    const data = channels.find((channel) => channel._id === message.channelID);
    const index = channels.findIndex(
      (channel) => channel._id === message.channelID
    );
    // console.log(channels);
    // console.log(message);

    if (index !== -1 && index !== undefined) {
      const updatedChannels = [
        channels[index],
        ...channels.slice(0, index),
        ...channels.slice(index + 1),
      ];
      setChannels(updatedChannels);
    }
  };

  return (
    <ChannelContext.Provider
      value={{ channels, setChannels, addChannel, addChannelInChannelList }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannel = () => useContext(ChannelContext);
