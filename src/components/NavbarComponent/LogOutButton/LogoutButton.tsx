"use client";

const LogoutButton = () => {
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Redirect to the homepage
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-lime-600 px-4 py-2 rounded-lg hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
