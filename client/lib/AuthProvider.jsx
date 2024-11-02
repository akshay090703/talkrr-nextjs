"use client";

import { AuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { apiClient } from "./api-client";
import { GET_USER_INFO } from "@/utils/constants";
import { toast } from "sonner";

export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });

        // console.log(res);

        if (res.status === 200 && res.data?.id) {
          setUserInfo(res.data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.log(error);
        setUserInfo(null);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
