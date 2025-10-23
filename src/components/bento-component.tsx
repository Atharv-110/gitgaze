"use client";
import { axiosInstance } from "@/lib/axios";
import React from "react";

const BentoComponent = () => {
  const fetchData = async () => {
    const res = await axiosInstance.post("/user", { login: "Atharv-110" });
    return res.data;
  };

  React.useEffect(() => {
    fetchData().then((data) => {
      console.log(data);
    });
  }, []);

  return <div>BentoComponent</div>;
};

export default BentoComponent;
