import { AuxProps } from "@/interfaces/ChildrenInterface";
import { Container } from "@mui/material";
import React from "react";

const PublicContainer = ({ children }: AuxProps) => {
  return <Container maxWidth="xl">{children}</Container>;
};

export default PublicContainer;
