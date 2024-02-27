import "simplebar/dist/simplebar.min.css";

import SimpleBar from "simplebar-react";
import { styled } from "@mui/material/styles";
import React, { forwardRef } from "react";

const ScrollbarRoot = styled(SimpleBar)`
  .simplebar-scrollbar::before {
    width: 6px;

    background-color: #c9edff;
  }
`;

// eslint-disable-next-line react/display-name
export const Scrollbar = React.forwardRef((props: any, children) => {
  return <ScrollbarRoot forceVisible {...props} />;
});
