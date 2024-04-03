import React from "react";
import detailImage from "../../images/コンテンツ.png";

export default function ElementC() {
  return (
    <div className="flex flex-col items-start m-3">
      <div class="bg-yellow-100 rounded-lg w-10 h-10 flex items-center justify-center">
        <img
          src={detailImage}
          alt="コンテンツアイコン"
          className="object-contain h-7 w-7"
        />
      </div>
      <div className="text-start">
        <p className="font-bold text-lg mt-2 mb-1">③コンテンツ</p>
        <p className="text-sm text-gray-600 mr-3">
          既存・カスタムのテンプレートを使い学習した詳細情報を登録します。
        </p>
      </div>
    </div>
  );
}
