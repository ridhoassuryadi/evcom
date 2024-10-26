"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IUser } from "@/lib/types/userData.type";

const User = () => {
  const [userData, setUserData] = useState<IUser | null>(null); // Use the User interface for userData
  const [error, setError] = useState(null); // Use a state variable to store the error
  const token = localStorage.getItem("token");

  useEffect(() => {
    {
      // Fetch user data using the provided API request
      fetch("https://dummyjson.com/auth/me", {
        next: { revalidate: 3600 },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data: IUser) => {
          // Check if the response contains an error message
          if (!data.username) {
            localStorage.removeItem("token");
            alert("Session Expired, Please Login Again");
            window.location.href = "/";
          } else {
            setUserData(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError(error); // Set the error state
        });
    }
  }, [token]);

  if (error) {
    return (
      <div className="App">
        Something went wrong: {(error as Error).message}
      </div>
    );
  }

  if (!userData) {
    // Render nothing while checking login status, redirecting, or fetching user data
    return null;
  }
  // Render the User component content with user data
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="w-96 bg-gray-800 p-8 shadow-2xl rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Full Name: {userData.firstName} {userData.lastName}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Email Address: {userData.email}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Profile Image:</p>
          <Image
            className="w-24 h-24 rounded-full mx-auto"
            src={userData.image}
            alt="Profile Picture"
            height={70}
            width={70}
            priority
          ></Image>
        </div>
        {/* Add additional user-specific content here */}
      </div>
    </div>
  );
};

export default User;
