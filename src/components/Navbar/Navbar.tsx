"use client";

import { useEffect, useState } from "react";
import CartIcon from "@/components/NavbarComponent/CartCount";
import HomePageButton from "@/components/NavbarComponent/HomePageButton";
import LogoutButton from "@/components/NavbarComponent/LogOutButton/LogoutButton";
import LoginButton from "@/components/NavbarComponent/LoginButton/LoginButton";
import ProductPageButton from "@/components/NavbarComponent/ProductPageButton";
import UserProfileButton from "@/components/NavbarComponent/UserProfileButton/UserProfileButton";
import Link from "next/link";

// Define the cart icon component
const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the user is logged in by verifying the token in local storage
    const token = localStorage.getItem("token");
    setIsUserLoggedIn(!!token);
  }, []); // Run the effect only once on component mount

  if (isUserLoggedIn === null) {
    // Authentication check is in progress, show loading state or nothing
    return null; // or show a loading spinner
  }

  return (
    <div className="flex justify-between w-full h-16 bg-gray-900 items-center px-24">
      <div className="flex gap-6">
        <HomePageButton />
        <ProductPageButton />
        <UserProfileButton />
      </div>
      <div className="flex gap-6">
        {isUserLoggedIn ? <LogoutButton /> : <LoginButton />}
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
