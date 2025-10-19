import React from "react";

const UserPage = async (props: { params: Promise<{ username: string }> }) => {
  const { username } = await props.params;
  const res = await fetch(`https://api.github.com/users/${username}`);
  const user = await res.json();
  console.log(user);

  return <div>{user.login}</div>;
};

export default UserPage;
