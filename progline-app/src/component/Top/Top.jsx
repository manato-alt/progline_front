import React, { useState } from "react";
import SearchForm from "./SearchForm";
import UserList from "./UserList";
import myImage from "../../images/toppage.jpg";
import Square from "./HoverSquare";
import dummyImages from "./dummyImages.jsx";

export default function Top() {
  const [hoveredImage, setHoveredImage] = useState("A");
  const [lastHoveredImage, setLastHoveredImage] = useState(null);

  const handleMouseEnter = (image) => {
    setLastHoveredImage(null);
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setLastHoveredImage(hoveredImage);
    setHoveredImage(null);
  };

  return (
    <div className="py-12">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-wider">
            技術の道しるべ、IT特化の学習メモリアル
          </h1>
          <p className="text-2xl mt-3 mx-auto text-gray-500">
            学習の記録・可視化・共有を行うことができます。
          </p>
        </div>
      </div>
      <div>
        <SearchForm />
      </div>
      <div className="mt-5 flex justify-center">
        <button className="bg-black text-white py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-gray-700">
          ログインして始める
        </button>
      </div>
      <div className="w-1/2 mx-auto mt-10">
        <img src={myImage} alt="イラスト画像" className="object-contain" />
      </div>
      <div>
        {/* 横並びの四角の要素 */}
        <div className="flex justify-center">
          {["A", "B", "C", "D", "E"].map((item) => (
            <Square
              key={item}
              id={item}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              isHovered={hoveredImage === item || lastHoveredImage === item}
            />
          ))}
        </div>
        {/* 画像 */}
        <div className="flex justify-center">
          {(hoveredImage || lastHoveredImage) && (
            <img
              src={dummyImages[hoveredImage || lastHoveredImage]}
              alt={`ダミー画像 ${hoveredImage || lastHoveredImage}`}
              className="mt-4"
            />
          )}
        </div>
      </div>
    </div>
  );
}
