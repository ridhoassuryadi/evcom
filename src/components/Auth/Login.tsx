"use client";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);

        // Go back to the previous page
        window.history.back();

        // Listen for the page navigation completion
        window.addEventListener("popstate", function onPopState() {
          // Remove the event listener to avoid multiple calls
          window.removeEventListener("popstate", onPopState);

          // Reload the current page
          location.reload();
        });
      } else {
        console.error("Login failed: Token not found in response");
        setErrorMessage("Wrong Login Credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Wrong Login Credentials");
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-500">
        <div className="w-96 bg-white p-8 shadow-md rounded-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            User Login
          </h1>

          <p className="text-black text-xs font-semibold text-center my-4">
            Get User Credentials from DummyJson{" "}
            <Link
              className="text-blue-500 underline hover:text-blue-600"
              target="_blank"
              href="https://dummyjson.com/users"
            >
              Here
            </Link>
          </p>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {errorMessage}
            </p>
          )}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>
          <button
            onClick={handleLogin}
            className="py-2 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 mt-4 w-full flex items-center justify-center hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
