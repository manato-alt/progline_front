import React from "react";
import shareImage from "../../images/共有.png";

export default function ElementE() {
  return (
    <div className="flex flex-col items-center m-3 lg:items-start">
      <div className="bg-orange-100 rounded-lg w-10 h-10 flex items-center justify-center">
        <img
          src={shareImage}
          alt="共有アイコン"
          className="object-contain h-8 w-8"
        />
      </div>
      <div className="text-center lg:text-start">
        <p className="mt-2 mb-1 text-xs md:text-sm md:font-bold lg:text-lg">
          ⑤共有
        </p>
        <p className="hidden lg:flex text-sm text-gray-600 mr-3">
          自分の記録を共有、他者の記録を閲覧できます。
        </p>
      </div>
    </div>
  );
}
