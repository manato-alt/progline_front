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
      className={`mb-[16px] flex px-[14px] py-[1px] justify-center rounded min-[700px]:rounded-xl items-center cursor-pointer min-[700px]:w-[7rem] min-[700px]:h-[6rem] min-[1000px]:w-[10rem] min-[1000px]:h-[7rem] ${
        isSelected ? "bg-white border-2" : "bg-gray-100"
      } transition-colors duration-300 ease-in-out`}
      onClick={() => handleClick(id)}
    >
      {content}
    </div>
  );
}
