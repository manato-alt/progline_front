import React from "react";
import myImage from "../../images/toppage-removebg.jpg";

export default function TermDetail() {
  return (
    <div>
      <div className="bg-[#f8f9fb] flex justify-center items-center  pt-5 pl-5 pr-32">
        <img
          src={myImage}
          alt="イラスト画像"
          className="object-contain w-1/3"
        />
        <p className="text-3xl text-sky-500 font-bold">
          技術の道しるべ、
          <br />
          IT特化の学習メモリアル
        </p>
      </div>
      <div className="border flex justify-between p-5  my-5 mx-32">
        <div>登録した媒体</div>
        <div>
          <button className="bg-gray-300 py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-gray-400">
            媒体を追加
          </button>
        </div>
      </div>
      <div>グラフを表示</div>
    </div>
  );
}
