import BentoComponent from "@/components/bento-component";
import { axiosInstance } from "@/lib/axios";
import { GitHubUser } from "@/types/github";
import React from "react";

const UserPage = async (props: { params: Promise<{ username: string }> }) => {
  const { username } = await props.params;
  // const res = await axiosInstance.post("/user", { login: username });

  // const userData: GitHubUser = res.data.data;

  return (
    <section className="mt-16 xl:max-w-screen-xl w-full mx-auto">
      <BentoComponent username={username} />
    </section>
  );
};

export default UserPage;
