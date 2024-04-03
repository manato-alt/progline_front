import React from "react";
import shareImage from "../../images/共有.png";

export default function ElementE() {
  return (
    <div className="flex flex-col items-start m-3">
      <div class="bg-orange-100 rounded-lg w-10 h-10 flex items-center justify-center">
        <img
          src={shareImage}
          alt="共有アイコン"
          className="object-contain h-8 w-8"
        />
      </div>
      <div className="text-start">
        <p className="font-bold text-lg mt-2 mb-1">⑤共有</p>
        <p className="text-sm text-gray-600 mr-3">
          自分の記録を共有、他者の記録を閲覧できます。
        </p>
      </div>
    </div>
  );
}
