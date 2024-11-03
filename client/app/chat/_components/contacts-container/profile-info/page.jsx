"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { getColor } from "@/utils/colors";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { IoPowerSharp } from "react-icons/io5";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAuth();
  const router = useRouter();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Logged out successfully!");
        router.replace("/auth");
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    } finally {
      setOpenLogoutDialog(false);
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-7 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center ">
        <div className="h-12 w-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo?.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo?.image}`}
                alt="profile image"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-lg border flex justify-center items-center rounded-full ${getColor(
                  userInfo?.color
                )}`}
              >
                {userInfo?.firstName
                  ? userInfo?.firstName.split("").shift()
                  : userInfo?.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>

        <div className="">
          {userInfo?.firstName &&
            userInfo?.lastName &&
            `${userInfo.firstName} ${userInfo.lastName}`}
        </div>
      </div>

      <div className="flex gap-5 ml-2">
        {/* Edit Profile */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-primary text-lg font-medium"
                onClick={() => router.push("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Logout */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-red-500 text-lg font-medium"
                onClick={() => setOpenLogoutDialog(true)}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <AlertDialog open={openLogoutDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <VisuallyHidden.Root>
                <AlertDialogTitle>Logout Alert Dialog.</AlertDialogTitle>
              </VisuallyHidden.Root>
              <AlertDialogDescription>
                Are you sure that you want to logout?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenLogoutDialog(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ProfileInfo;
