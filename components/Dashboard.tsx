"use client";

import { getUser } from "@/hook/getUser";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut } from "next-auth/react";
import Link from "next/link";
import DashboardAvatar from "@/constants/dashboardAvatar";

const Dashboard = () => {
  const user = getUser();
  const onSignOut = () => {
    signOut();
  }
  return (
    <>
      <div className="max-w-md mx-auto mt-8">
        <Card className="bg-neutral-200 dark:bg-neutral-900">
          <CardHeader>
            <CardTitle className="flex justify-between">{user?.name}&apos;s Profile <DashboardAvatar  src={user?.image || ""} /></CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Welcome to your dashboard!</p>
            <p className="text-sm text-gray-500">Role: {user?.role}</p>
          </CardContent>
          <CardFooter>
            <Link href="/update-profile" className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition duration-200 mr-2">
              Update Profile
            </Link>
            <button onClick={onSignOut} className="px-6 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-900 transition duration-200">
              Sign Out
            </button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
