import React from "react";
import { CardType } from "../hooks/usebankData.types";
interface HighlightedImageProps {
  imageSrc: string;
  cardSelected: typeof CardType | string;
  highlight: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

const HighlightedImage: React.FC<HighlightedImageProps> = ({
  imageSrc,
  highlight,
  cardSelected,
}) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={imageSrc}
        alt="credit-card"
        style={{ filter: "grayscale(100%)" }}
      />

      {/* Highlight Box */}
      <img
        src={`/${cardSelected}.png`}
        style={{
          position: "absolute",
          top: highlight.top,
          left: highlight.left,
          width: highlight.width,
          height: highlight.height,
        }}
      />
    </div>
  );
};
export default HighlightedImage;
