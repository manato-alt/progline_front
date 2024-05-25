import React from "react";
import { BsPersonVideo3 } from "react-icons/bs";

export default function ElementC() {
  return (
    <div className="flex flex-col items-center">
      <BsPersonVideo3 className="max-[699px]:hidden text-4xl min-[1000px]:text-6xl" />
      <div className="text-center">
        <p className="text-sm min-[700px]:text-base min-[1000px]:text-xl min-[700px]:font-bold">
          コンテント
        </p>
      </div>
    </div>
  );
}
