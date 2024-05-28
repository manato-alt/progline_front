import React from "react";
import logo from "../images/logo-icon.png";

export default function NoContents() {
  return (
    <div className="flex flex-col items-center py-20">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />
      <h1 className="text-xl md:text-3xl font-bold mb-4 text-cyan-500">
        No content.
      </h1>
      <p className="text-sm md:text-lg  mb-4">
        登録されたコンテンツはありません。
      </p>
    </div>
  );
}
