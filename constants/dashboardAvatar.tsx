"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser } from "@/hook/getUser";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TbLogout, TbUser } from "react-icons/tb";

const DashboardAvatar = ({ src }: { src?: string | undefined }) => {
  const router = useRouter();
  const user = getUser()

  const fallback = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const onLogout = () => {
    signOut();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback
            >{fallback}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem >
            Change Avatar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DashboardAvatar;
