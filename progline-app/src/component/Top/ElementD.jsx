import React from "react";
import visualizationImage from "../../images/可視化.png";

export default function ElementD() {
  return (
    <div className="flex flex-col items-start m-3">
      <div class="bg-indigo-100 rounded-lg w-10 h-10 flex items-center justify-center">
        <img
          src={visualizationImage}
          alt="可視化アイコン"
          className="object-contain w-8 h-8"
        />
      </div>
      <div className="text-start">
        <p className="font-bold text-lg mt-2 mb-1">④可視化</p>
        <p className="text-sm text-gray-600 mr-3">
          カテゴリごとの学習度合いをグラフ化し、可視化します。
        </p>
      </div>
    </div>
  );
}
