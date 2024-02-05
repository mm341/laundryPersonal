import React from "react";

import { Box, InputLabel } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import coverphoto from "../../../public/info/photoUpdate.png";
const ImagePreviewer = ({
  anchor,
  file,
  label,
  width,
  imageUrl,
  borderRadius,
  error,
}: {
  file: string | File | Blob | MediaSource | undefined;
  anchor: any;
  label?: string | undefined;
  width?: string | undefined;
  imageUrl?: string | undefined;
  borderRadius?: string;
  error?: boolean | undefined | string;
}) => {
  let previewImage:
    | {
        url: string | any;
      }
    | string
    | File
    | Blob
    | MediaSource
    | any;

  if (typeof file !== "string" && file) {
    previewImage = {
      url: URL.createObjectURL(file),
    };
  } else previewImage = file;

  return (
    <>
      <Box>
        {previewImage ? (
          <Box
            sx={{ width: "150px", height: "150px" }}
            onClick={() => anchor.current.click()}
          >
            {typeof file !== "string" ? (
              <img src={previewImage?.url} alt="preview" loading="lazy" />
            ) : (
              <img
                src={`${imageUrl}/${previewImage}`}
                alt="preview"
                loading="lazy"
              />
            )}
          </Box>
        ) : (
          <img
            src={coverphoto?.src}
            onClick={() => anchor.current.click()}
            alt="changeimg"
            loading="lazy"
            style={{ width: "100px", height: "100px" }}
          />
        )}
      </Box>
    </>
  );
};

export default ImagePreviewer;
