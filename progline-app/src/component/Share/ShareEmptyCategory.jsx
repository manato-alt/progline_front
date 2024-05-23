import React from "react";
import logo from "../../images/logo-icon.png";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";

export default function ShareEmptyCategory() {
  return (
    <div className="flex flex-col items-center h-[92vh] pt-28 bg-[#f7f9fb] px-8">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />
      <p className="text-sm md:text-base mb-4">
        登録されたカテゴリーはありません。
      </p>
      <Link
        to="/"
        className="text-sm md:text-base flex items-center justify-center text-cyan-500 border border-cyan-500 bg-white hover:text-white hover:bg-cyan-500 py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        <TiHome className="mr-2" />
        トップへ戻る
      </Link>
    </div>
  );
}
