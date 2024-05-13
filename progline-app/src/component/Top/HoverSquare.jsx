import React from "react";
import ElementA from "./ElementA";
import ElementB from "./ElementB";
import ElementC from "./ElementC";
import ElementD from "./ElementD";
import ElementE from "./ElementE";

export default function HoverSquare({
  id,
  handleMouseEnter,
  handleMouseLeave,
  isHovered,
}) {
  let content = <ElementA />;

  switch (id) {
    case "A":
      content = <ElementA />;
      break;
    case "B":
      content = <ElementB />;
      break;
    case "C":
      content = <ElementC />;
      break;
    case "D":
      content = <ElementD />;
      break;
    case "E":
      content = <ElementE />;
      break;
    default:
      content = <ElementA />;
  }
  return (
    <div
      className={`rounded-lg my-1 flex justify-center cursor-pointer w-[6rem] h-[6rem] md:w-28 md:h-28 lg:w-48 lg:h-48 ${
        isHovered ? "bg-white border-2" : "bg-gray-100"
      }`}
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </div>
  );
}
