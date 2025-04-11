"use client";
import { useEffect, useState } from "react";

export const useAuthCheck = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
      setIsLoggedIn(true);
    }

    setLoading(false);
  }, []);

  return { loading, isLoggedIn };
};
