import React, { useEffect, useState } from "react";

import placeholder from "../../../public/notimage.png";
import { Box } from "@mui/material";
interface customImage {
  cursor?: string;
  mdheight?: string;
  maxWidth?: string;
  height?: string;
  width?: string;
  objectfit?: string;
  minwidth?: string;
  alt: string;
  borderRadius?: string;
  marginBottom?: string;
  smheight?: string;
  smmb?: string;
  smmaxwidth?: string;
  smwidth?: string;
  py?: string;
  src: any;
}
const CustomImageContainer = ({
  cursor,
  mdheight,
  maxWidth,
  height,
  width,
  objectfit,
  minwidth,
  src,
  alt,
  borderRadius,
  marginBottom,
  smheight,
  smmb,
  smmaxwidth,
  smwidth,
  py,
}: customImage) => {
  const [imageFile, setState] = useState<string>("");
  useEffect(() => {
    setState(src);
  }, [src]);
  return (
    <Box
      sx={{
        height: height,
        width: width,
        objectfit: objectfit,
        minwidth: minwidth,
        borderRadius: borderRadius,
        marginBottom: marginBottom,
        smheight: smheight,
        smmb: smmb,
        maxWidth: maxWidth,
        smmaxwidth: smmaxwidth,
        smwidth: smwidth,
        mdheight: mdheight,
        cursor: cursor,
        py: py,
      }}
    >
      <img
        src={imageFile}
        alt={alt}
        onError={(e) => {
          // currentTarget.onerror = null; // prevents looping
          setState(placeholder.src);
        }}
        loading="lazy"
      />
    </Box>
  );
};
export default CustomImageContainer;
