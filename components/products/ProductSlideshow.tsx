import React, { FC } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface Props {
  images: string[];
}

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
  height: "650px",
};

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide easing="ease" duration={4000} indicators>
      {images.map((img) => {
        return (
          <div key={img}>
            <div
              style={{
                ...divStyle,
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
