import React from "react";
import { BsPersonVideo3 } from "react-icons/bs";

export default function ElementC() {
  return (
    <div className="flex flex-col items-center m-3">
      <BsPersonVideo3 className="text-6xl" />
      <div className="text-center">
        <p className="text-xl font-bold">コンテント</p>
      </div>
    </div>
  );
}
