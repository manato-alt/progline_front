import React from "react";
import categoryImage from "../../images/カテゴリ.png";

export default function ElementA() {
  return (
    <div className="flex flex-col items-center m-3 lg:items-start">
      <div className="bg-violet-200 rounded-lg w-10 h-10 flex items-center justify-center">
        <img
          src={categoryImage}
          alt="カテゴリアイコン"
          className="object-contain h-8 w-8 mx-auto"
        />
      </div>
      <div className="text-center lg:text-start">
        <p className="mt-2 mb-1 text-xs md:text-sm md:font-bold lg:text-lg">
          ①カテゴリ
        </p>
        <p className="hidden lg:flex text-sm text-gray-600 mr-3">
          既存・カスタムのテンプレートを使いカテゴリを登録します。
        </p>
      </div>
    </div>
  );
}
