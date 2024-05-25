import React from "react";
import { BiCategory } from "react-icons/bi";

export default function ElementA() {
  return (
    <div className="flex flex-col items-center">
      <BiCategory className="max-[699px]:hidden text-4xl min-[1000px]:text-6xl" />
      <div className="text-center">
        <p className="text-sm min-[700px]:text-base min-[1000px]:text-xl min-[700px]:font-bold">
          カテゴリ
        </p>
      </div>
    </div>
  );
}
