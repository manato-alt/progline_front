import React from "react";
import { FaAppStoreIos } from "react-icons/fa";

export default function ElementB() {
  return (
    <div className="flex flex-col items-center m-3">
      <FaAppStoreIos className="text-6xl" />
      <div className="text-center">
        <p className="text-xl font-bold">サービス</p>
      </div>
    </div>
  );
}
