import React, { useEffect } from "react";
import { AuthStore } from "../../Store/authStore";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const removeToken = AuthStore((state)=>state.removeToken);
  const navigate = useNavigate();
  useEffect(() => {
    removeToken();
    navigate("/");
  }, [removeToken, navigate]);
  return null;
};

export default Logout;
