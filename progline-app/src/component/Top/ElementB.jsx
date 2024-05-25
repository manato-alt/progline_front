import React from "react";
import { FaAppStoreIos } from "react-icons/fa";

export default function ElementB() {
  return (
    <div className="flex flex-col items-center">
      <FaAppStoreIos className="max-[699px]:hidden text-4xl min-[1000px]:text-6xl" />
      <div className="text-center">
        <p className="text-sm min-[700px]:text-base min-[1000px]:text-xl min-[700px]:font-bold">
          サービス
        </p>
      </div>
    </div>
  );
}
