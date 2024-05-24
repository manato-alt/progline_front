import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function ElementD() {
  return (
    <div className="flex flex-col items-center m-3">
      <FaMagnifyingGlass className="text-6xl" />
      <div className="text-center">
        <p className="text-xl font-bold">可視化</p>
      </div>
    </div>
  );
}
