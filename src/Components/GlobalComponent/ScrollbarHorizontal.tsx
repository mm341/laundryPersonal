import "simplebar/dist/simplebar.min.css";

import SimpleBar from "simplebar-react";
import { styled } from "@mui/material/styles";
import React, { forwardRef } from "react";

const ScrollbarRoot = styled(SimpleBar)`
  .simplebar-scrollbar::before {
    

    background-color: #d9d9d9;
  }
`;

// eslint-disable-next-line react/display-name
export const ScrollbarHorizontal = React.forwardRef((props: any, children) => {
  return <ScrollbarRoot {...props} />;
});
