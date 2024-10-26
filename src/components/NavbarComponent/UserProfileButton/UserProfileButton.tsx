"use client";
import { useRouter } from "next/navigation";

const UserProfileButton = () => {
  const router = useRouter();
  return (
    <div>
      <button
        className="bg-lime-600 px-4 py-2 rounded-lg hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
        onClick={() => {
          router.push("/user");
        }}
      >
        Profile (Protected Route)
      </button>
    </div>
  );
};

export default UserProfileButton;
