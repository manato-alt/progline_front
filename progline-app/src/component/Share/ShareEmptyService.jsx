import React from "react";
import { Link } from "react-router-dom";

export default function ShareEmptyService({ category, shareCode }) {
  return (
    <div className="flex flex-col items-center h-[92vh] pt-28 bg-[#f7f9fb] px-8">
      {category && (
        <>
          {(category.image.url || category.original_url) && (
            <img
              src={category.image.url || category.original_url}
              alt="Logo"
              className="w-24 h-24 rounded-full"
            />
          )}
          <p className="mb-8 font-bold text-2xl">{category.name}</p>
        </>
      )}
      <p className="text-sm md:text-base mb-4">
        登録されたサービスはありません。
      </p>
      <Link
        to={`/shareTerms/${shareCode}`}
        className="text-sm md:text-base flex items-center justify-center text-cyan-500 border border-cyan-500 bg-white hover:text-white hover:bg-cyan-500 py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        カテゴリページに戻る
      </Link>
    </div>
  );
}
