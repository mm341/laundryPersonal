import { Box, IconButton, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

import ImageIcon from "@mui/icons-material/Image";
import DefaultAvatar from "../../../public/info/photoUpdate.png";
import ImageCard from "./ImageCard";

type Props = {
  id: string;
  init?: string;

  error: boolean | undefined | string;
  onImageSubmit: (file: File) => void;
};

const InputImage = ({
  id,
  init,

  error,
  onImageSubmit,
}: Props) => {
  const [preview, setPreview] = useState<string>(init ?? "");

  const onImageSelected = (e: ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();

    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const imageFile = e.target.files[0];

    reader.readAsDataURL(imageFile);

    reader.onload = () => {
      if (reader.readyState !== 2) {
        return;
      }

      setPreview(reader.result as string);
      onImageSubmit(imageFile);
    };
  };

  return (
    <Box
      id={id}
      
    >
      <label htmlFor="icon-button-photo">
        <ImageCard preview={preview} alt={id} base={DefaultAvatar?.src} />
      </label>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <input
          accept="image/*"
          id="icon-button-photo"
          onChange={onImageSelected}
          type="file"
          name="photo"
          hidden
        />
      </Box>

      {error && (
        <Typography variant="caption" sx={{ color: "red" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default InputImage;
