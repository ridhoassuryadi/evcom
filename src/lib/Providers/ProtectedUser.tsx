// components/ProtectedUser.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If the token is undefined or falsy, redirect to the login page
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // Render the children only if there is a valid token
  return typeof window !== "undefined" && localStorage.getItem("token") ? (
    <>{children}</>
  ) : null;
}
