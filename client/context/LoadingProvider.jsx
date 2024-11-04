"use client";

import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileDownloadProgress, setFileDownloadProgress] = useState(0);

  return (
    <LoadingContext.Provider
      value={{
        isUploading,
        setIsUploading,
        isDownloading,
        setIsDownloading,
        fileUploadProgress,
        setFileUploadProgress,
        fileDownloadProgress,
        setFileDownloadProgress,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
