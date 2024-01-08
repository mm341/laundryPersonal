import React from "react";

type property = {
  preview: string;
  alt: string;
  base: string;
};

function ImageCard({ preview, base, alt }: property) {
  return (
    <img
      src={preview ? preview : base}
      alt={alt}
      width="150px"
      height="150px"
      style={{
        width: "150px",
        height: "150px",
        borderRadius: "50%",
      }}
    />
  );
}

export default ImageCard;
