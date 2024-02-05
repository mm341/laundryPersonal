import React from "react";
import PropTypes from "prop-types";
import { CustomDrawerForSidebar, SideDrawerWrapper } from "@/styles/PublicStyles";


interface customSideDrawer {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  anchor: "left" | "bottom" | "right" | "top" | undefined;
}
const CustomSideDrawer = (props: customSideDrawer) => {
  const { open, onClose, children, anchor } = props;

  return (
    <CustomDrawerForSidebar
      anchor={anchor}
      onClose={onClose}
      open={open}
      variant="temporary"
    >
      <SideDrawerWrapper>{children}</SideDrawerWrapper>
    </CustomDrawerForSidebar>
  );
};

CustomSideDrawer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomSideDrawer;
