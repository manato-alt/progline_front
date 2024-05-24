import React from "react";
import { FaShareAlt } from "react-icons/fa";

export default function ElementE() {
  return (
    <div className="flex flex-col items-center m-3">
      <FaShareAlt className="text-6xl" />
      <div className="text-center">
        <p className="text-xl font-bold">共有</p>
      </div>
    </div>
  );
}
