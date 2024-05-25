import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function ElementD() {
  return (
    <div className="flex flex-col items-center">
      <FaMagnifyingGlass className="max-[699px]:hidden text-4xl min-[1000px]:text-6xl" />
      <div className="text-center">
        <p className="text-sm min-[700px]:text-base min-[1000px]:text-xl min-[700px]:font-bold">
          可視化
        </p>
      </div>
    </div>
  );
}
