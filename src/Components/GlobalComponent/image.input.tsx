import { Box, Button, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

import DefaultAvatar from "../../../public/info/photoUpdate.png";
import ImgChangeIcon from "../../../public/info/changeImg.svg";
import ImageCard from "./ImageCard";
import FormSubmitButton from "../UserInfo/ProfileBody/FormSubmitButton";

type Props = {
  id: string;
  init?: string;
  imgValue?: string;
  error: boolean | undefined | string;
  onImageSubmit: (file: File) => void;
};

const InputImage = ({ id, init, imgValue, error, onImageSubmit }: Props) => {
  //  hooks
  const [preview, setPreview] = useState<string>(init ?? "");
  //  handel image selected
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
    <Box id={id}>
      <label htmlFor="icon-button-photo">
        <ImageCard preview={preview} alt={id} base={DefaultAvatar?.src} />
      </label>

      <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
        <input
          accept="image/*"
          id="icon-button-photo"
          onChange={onImageSelected}
          type="file"
          name="photo"
          hidden
        />
        <label htmlFor="icon-button-photo">
          <Box
            sx={{
              position: "absolute",
              left: { md: "15%", sm: "18%", xs: "44%" },
              top: "-40px",
            }}
          >
            <img src={ImgChangeIcon?.src} loading="lazy" alt="changeicon" />
          </Box>
        </label>
      </Box>

      {error && (
        <Typography variant="caption" sx={{ color: "red" }}>
          {error}
        </Typography>
      )}
      {imgValue && <FormSubmitButton imgChange imgValue={imgValue} />}
    </Box>
  );
};

export default InputImage;
