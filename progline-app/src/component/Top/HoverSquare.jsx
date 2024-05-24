import React from "react";
import ElementA from "./ElementA";
import ElementB from "./ElementB";
import ElementC from "./ElementC";
import ElementD from "./ElementD";
import ElementE from "./ElementE";

export default function HoverSquare({ id, handleClick, isSelected }) {
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
      className={`my-1 flex justify-center rounded-xl items-center cursor-pointer w-40 h-28 ${
        isSelected ? "bg-white border-2" : "bg-gray-100"
      } transition-colors duration-300 ease-in-out`}
      onClick={() => handleClick(id)}
    >
      {content}
    </div>
  );
}
