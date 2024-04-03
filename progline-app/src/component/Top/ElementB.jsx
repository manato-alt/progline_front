import React from "react";
import platformImage from "../../images/媒体.png";

export default function ElementB() {
  return (
    <div className="flex flex-col items-start m-3">
      <div class="bg-rose-100 rounded-lg w-10 h-10 flex items-center justify-center">
        <img
          src={platformImage}
          alt="プラットフォームアイコン"
          className="object-contain h-8 w-8"
        />
      </div>
      <div className="text-start">
        <p className="font-bold text-lg mt-2 mb-1">②プラットフォーム</p>
        <p className="text-sm text-gray-600 mr-3">
          既存・カスタムのテンプレートを使い学習したプラットフォームを登録します。
        </p>
      </div>
    </div>
  );
}
