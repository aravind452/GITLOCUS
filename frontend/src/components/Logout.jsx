import React from "react";
import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/Authcontext.jsx";

const Logout = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { credentials: "include" });
      const data = await res.json();

      localStorage.removeItem("explore_language");
      localStorage.removeItem("explore_repos");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <img
        src={authUser?.avatarUrl}
        className="w-10 h-10 rounded-full border border-gray-800"
      />

      <div
        onClick={handleLogout}
        className="cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800"
      >
        <MdLogout size={22} />
      </div>
    </>
  );
};

export default Logout;
