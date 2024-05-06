"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "./ui/dark-toggle";
import Link from "next/link";
import Menu from "./ui/menu-button";
import Logo from "@/constants/logo";
import ProfileAvatar from "@/constants/avatar";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session =  useSession()
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-black backdrop-filter backdrop-blur-lg bg-opacity-10 border-b border-gray-200 dark:border-gray-800">
      <div className=" px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl text-gray-900 dark:text-gray-200 font-semibold translate-x-5"
          >
            <Logo /> <span className="sr-only">Logo</span>
          </Link>
          <div className="flex space-x-4 text-gray-900 dark:text-gray-200">
            {/* Menu Button for Small Screens */}
            <div className=" md:hidden flex items-center space-x-4 cursor-pointer">
              <ModeToggle />
              <Menu onClick={toggleMenu} />
            </div>
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-4 mt-3">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="#">About</Link>
              <Link href="#">Projects</Link>
              <Link href="/auth/login">Login</Link>
            </div>
          </div>
          <div className="hidden md:flex -translate-x-5 space-x-5">
            <ModeToggle />
            {session && session.data ? <ProfileAvatar src={session.data.user?.image || ""}/> : null} 
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3">
            <div className="flex flex-col items-end space-y-3 mb-2 text-xl">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="#">About</Link>
              <Link href="#">Projects</Link>
              <Link href="/auth/login">Login</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
