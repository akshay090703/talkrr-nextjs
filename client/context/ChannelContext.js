"use client";

import { createContext, useContext, useState } from "react";

export const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);

  const addChannel = (channel) => {
    setChannels([channel, ...channels]);
  };

  return (
    <ChannelContext.Provider value={{ channels, setChannels, addChannel }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannel = () => useContext(ChannelContext);
