import React from "react";
import detailImage from "../../images/コンテンツ.png";

export default function ElementC() {
  return (
    <div className="flex flex-col items-center m-3 lg:items-start">
      <div class="bg-yellow-100 rounded-lg w-10 h-10 flex items-center justify-center">
        <img
          src={detailImage}
          alt="コンテンツアイコン"
          className="object-contain h-7 w-7"
        />
      </div>
      <div className="text-center lg:text-start">
        <p className="mt-2 mb-1 text-xs md:text-sm md:font-bold lg:text-lg">
          ③コンテンツ
        </p>
        <p className="hidden lg:flex text-sm text-gray-600 mr-3">
          既存・カスタムのテンプレートを使い学習した詳細情報を登録します。
        </p>
      </div>
    </div>
  );
}
