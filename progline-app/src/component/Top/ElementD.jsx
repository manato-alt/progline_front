import React from "react";
import visualizationImage from "../../images/可視化.png";

export default function ElementD() {
  return (
    <div className="flex flex-col items-center m-3 lg:items-start">
      <div className="bg-indigo-100 rounded-lg w-10 h-10 flex items-center justify-center">
        <img
          src={visualizationImage}
          alt="可視化アイコン"
          className="object-contain w-8 h-8"
        />
      </div>
      <div className="text-center lg:text-start">
        <p className="mt-2 mb-1 text-xs md:text-sm md:font-bold lg:text-lg">
          ④可視化
        </p>
        <p className="hidden lg:flex text-sm text-gray-600 mr-3">
          カテゴリごとの学習度合いをグラフ化し、可視化します。
        </p>
      </div>
    </div>
  );
}
