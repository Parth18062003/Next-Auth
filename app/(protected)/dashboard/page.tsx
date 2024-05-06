"use client";

import React from "react";
import { getUser } from "@/hook/getUser";
import { signOut } from "next-auth/react";

const onClick = () => {
  signOut();
};
const page = () => {
  const user = getUser();
  return (
    <>
      <div>{JSON.stringify(user)}</div>
      <div>
        <button onClick={onClick}>Log Out</button>
      </div>
    </>
  );
};

export default page;
