import React from "react";
import platformImage from "../../images/媒体.png";

export default function ElementB() {
  return (
    <div className="flex flex-col items-center m-3 lg:items-start">
      <div class="bg-rose-100 rounded-lg w-10 h-10 flex items-center justify-center">
        <img
          src={platformImage}
          alt="プラットフォームアイコン"
          className="object-contain h-8 w-8"
        />
      </div>
      <div className="text-center lg:text-start">
        <p className="mt-2 mb-1 text-xs md:text-sm md:font-bold lg:text-lg">
          ②サービス
        </p>
        <p className="hidden lg:flex text-sm text-gray-600 mr-3">
          既存・カスタムのテンプレートを使い学習したサービスを登録します。
        </p>
      </div>
    </div>
  );
}
