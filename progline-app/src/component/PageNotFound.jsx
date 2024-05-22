import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-icon.png";
import { TiHome } from "react-icons/ti";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center h-[92vh] pt-28 bg-[#f7f9fb] px-8">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />
      <h1 className="text-xl md:text-3xl font-bold mb-4 text-cyan-500">
        Page Not Found
      </h1>
      <p className="text-sm md:text-lg text-cyan-500 mb-4">
        指定されたページが見つかりませんでした。
      </p>
      <p className="text-sm md:text-lg mb-4">
        共有されたURLからアクセスした場合、コピーミスがないか確認してください。
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
