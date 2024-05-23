import React from "react";
import logo from "../../images/logo-icon.png";

export default function EmptyCategory({ handleShow }) {
  return (
    <div className="flex flex-col items-center h-[92vh] pt-28 bg-[#f7f9fb] px-8">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />
      <p className="text-sm md:text-base mb-4">
        登録されたカテゴリーはありません。
        <br />
        あなたの学習を記録しませんか？
      </p>
      <button
        onClick={handleShow}
        className="bg-white border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white py-2 px-4 rounded items-center mt-1 mr-2 transition duration-300 ease-in-out"
      >
        さっそく記録する！
      </button>
    </div>
  );
}
