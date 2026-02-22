import React from "react";
import PageHeader from "./page-header";

const Header = ({ username, route }: { username?: string; route: string }) => {
  return <PageHeader route={route} username={username} />;
};

export default React.memo(Header);
