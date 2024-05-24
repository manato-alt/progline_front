import React from "react";
import { BiCategory } from "react-icons/bi";

export default function ElementA() {
  return (
    <div className="flex flex-col items-center m-3">
      <BiCategory className="text-6xl" />
      <div className="text-center">
        <p className="text-xl font-bold">カテゴリ</p>
      </div>
    </div>
  );
}
