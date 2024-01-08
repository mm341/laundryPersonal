import React, { useRef } from "react";
import ImagePreviewer from "./ImagePreviewer";

const ImageUploaderWithPreview = ({
  file,

  labelText,

  onChange,
  width,
  imageUrl,
  borderRadius,
  error,
}: {
  file: string | File | Blob | MediaSource | undefined;

  labelText?: string;

  onChange: (e: any) => void;
  width?: string;
  imageUrl?: string;
  borderRadius?: string;
  error?: boolean | undefined | string;
}) => {
  const imageContainerRef: any = useRef();

  return (
    <>
      <ImagePreviewer
        anchor={imageContainerRef}
        file={file}
        label={labelText}
        width={width}
        imageUrl={imageUrl}
        borderRadius={borderRadius}
        error={error}
      />

      <input
        required
        ref={imageContainerRef}
        id="file"
        name="file"
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          onChange(e);
        }}
      />
    </>
  );
};
export default ImageUploaderWithPreview;
