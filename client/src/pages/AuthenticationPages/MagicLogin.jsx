import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function MagicLogin(){
  const { token } = useParams();
  const {verifyMagicLink}=useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Logging you in...");

  useEffect(() => {
    if (!token) {
      setMsg("Invalid link");
      return;
    }

    const verify = async () => {
      try {
        const res = await verifyMagicLink(token);
        if (res.data?.success) {
              toast.success(res.data.message || " Login  successfully!");
          setMsg("Login successful! Redirecting...");
          // redirect to client dashboard after slight delay
          setTimeout(() => navigate("/dashboard"), 800);
        } else {
          setMsg(res.data?.message || "Failed to login");
        }
      } catch (err) {
        console.error(err);
        const message = err?.response?.data?.message || "Error verifying magic link";
        setMsg(message);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="h-screen flex flex-col justify-center items-center" style={{ padding: 24 }}>
      <h3>{msg}</h3>
    </div>
  );
}
