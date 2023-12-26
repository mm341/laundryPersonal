import { useEffect } from "react";
import PropTypes from "prop-types";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import stylisRTLPlugin from "stylis-plugin-rtl";

const styleCache = () =>
  createCache({
    key: "rtl",
    prepend: true,
    stylisPlugins: [stylisRTLPlugin],
  });

interface rtl {
  children: React.ReactNode;
  direction: string | undefined | any;
}
export const RTL = (props: rtl) => {
  const { children, direction } = props;

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === "rtl") {
    return <CacheProvider  value={styleCache()}>{children}</CacheProvider>;
  }

  return <>{children}</>;
};

RTL.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["ltr", "rtl"]),
};
