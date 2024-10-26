import User from "@/components/UserProfile/User";
import ProtectedUser from "@/lib/Providers/ProtectedUser";
import React from "react";

const page = () => {
  return (
    <div>
      <ProtectedUser>
        <User />
      </ProtectedUser>
    </div>
  );
};

export default page;
