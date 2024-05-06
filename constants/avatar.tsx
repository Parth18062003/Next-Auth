"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbLogout, TbUser } from "react-icons/tb";

const ProfileAvatar = ({ src }: { src?: string | undefined }) => {
  const session = useSession();
  const router = useRouter();
  const [gradient, setGradient] = useState(
    "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
  );

  const onLogout = () => {
    signOut();
  };
  useEffect(() => {
    const gradients = [
      "linear-gradient(90deg, rgba(9,9,121,1) 13%, rgba(0,212,255,1) 100%)",
      "linear-gradient(90deg, hsla(339, 100%, 55%, 1) 0%, hsla(197, 100%, 64%, 1) 100%)",
      "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
      "linear-gradient(90deg, hsla(265, 53%, 29%, 1) 0%, hsla(24, 93%, 73%, 1) 100%)",
      "linear-gradient(90deg, hsla(31, 90%, 76%, 1) 0%, hsla(302, 82%, 76%, 1) 100%)",
      "linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)",
      "linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)",
      // Add more gradient strings as needed
    ];

    const randomGradientIndex = Math.floor(Math.random() * gradients.length);
    const randomGradient = gradients[randomGradientIndex];
    setGradient(randomGradient);
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback
              style={{ backgroundImage: gradient }}
            ></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              router.push("/dashboard");
            }}
            className="text-xl"
          >
            <TbUser className="mr-4"/>Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout} className="text-xl">
            <TbLogout className="mr-4"/>    Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileAvatar;
