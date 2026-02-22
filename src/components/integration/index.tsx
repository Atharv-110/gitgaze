import React from "react";
import Holopin from "./holopin";
import { IntegrationComponentProps } from "@/types/integration/integration.types";

const Integrations = ({ holopinUsername }: IntegrationComponentProps) => {
  return (
    <>
      <Holopin holopinUsername={holopinUsername} />
    </>
  );
};

export default Integrations;
