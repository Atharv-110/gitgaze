import { axiosInstance } from "@/lib/axios";
import { GitHubUser } from "@/types/github";
import React from "react";

const UserPage = async (props: { params: Promise<{ username: string }> }) => {
  const { username } = await props.params;
  const res = await axiosInstance.post("/user", { login: username });
  const userData: GitHubUser = res.data.data;

  return <div className="w-full text-center">{userData.name}</div>;
};

export default UserPage;
