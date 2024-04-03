import React from "react";
import categoryImage from "../../images/カテゴリ.png";

export default function ElementA() {
  return (
    <div className="flex flex-col items-start m-3">
      <div class="bg-violet-200 rounded-lg w-10 h-10 flex items-center justify-center">
        <img
          src={categoryImage}
          alt="カテゴリアイコン"
          className="object-contain h-8 w-8"
        />
      </div>
      <div className="text-start">
        <p className="font-bold text-lg mt-2 mb-1">①カテゴリ</p>
        <p className="text-sm text-gray-600 mr-3">
          既存・カスタムのテンプレートを使いカテゴリを登録します。
        </p>
      </div>
    </div>
  );
}
