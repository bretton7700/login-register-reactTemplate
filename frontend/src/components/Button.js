import React from "react";
import * as Icons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import "./Button.css";

function Button() {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }
  return (
    <>
      
        <button onClick={signOut} className="btn" style={{margin:'0px 0px 0px 0px'}}>
          <Icons.FaUserPlus />
          <span>Logout</span>
        </button>
      
    </>
  );
}

export default Button;