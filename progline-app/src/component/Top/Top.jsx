import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchForm from "./SearchForm";
import myImage from "../../images/toppage.jpg";
import Square from "./HoverSquare";
import dummyImages from "./dummyImages.jsx";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Top() {
  const [hoveredImage, setHoveredImage] = useState("A");
  const [lastHoveredImage, setLastHoveredImage] = useState(null);
  const [user] = useAuthState(auth);
  const [searchResults, setSearchResults] = useState([]); // 検索結果の状態追加
  const [searchError, setSearchError] = useState(""); // エラーメッセージの状態追加
  const dropdownRef = useRef(null); // ドロップダウンのrefを追加

  const handleMouseEnter = (image) => {
    setLastHoveredImage(null);
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setLastHoveredImage(hoveredImage);
    setHoveredImage(null);
  };

  // シェアコードを検索する関数
  const searchShareCode = async (code) => {
    try {
      const response = await axios.post(
        "http://localhost:3010/shared_codes/search",
        { code }
      );
      setSearchResults([{ public_name: response.data.public_name, code }]);
      setSearchError(""); // エラーをクリア
    } catch (error) {
      console.error("シェアコードの検索エラー:", error);
      setSearchResults([]); // 検索結果をクリア
      setSearchError("シェアコードが見つかりません");
    }
  };

  // クリック外しでドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="py-12">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wider md:text-4xl lg:text-5xl">
            技術の道しるべ、
            <br className="sm:hidden" />
            IT特化の学習メモリアル
          </h1>
          <p className="mt-3 mx-auto text-gray-500 sm:text-2xl">
            学習の記録・可視化・共有を行うことができます。
          </p>
        </div>
      </div>
      <div className="relative">
        <SearchForm onSearch={searchShareCode} />
        {/* 検索結果のドロップダウン表示 */}
        {searchResults.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-1/2 sm:w-2/5"
          >
            {searchResults.map((result, index) => (
              <Link
                to={`/shareTerms/${result.code}`}
                key={index}
                className="block p-2 hover:bg-gray-100 cursor-pointer"
              >
                {result.public_name}
              </Link>
            ))}
          </div>
        )}
        {/* エラーメッセージの表示 */}
        {searchError && (
          <div className="mt-4 text-center text-red-500">
            <p>{searchError}</p>
          </div>
        )}
      </div>
      {user ? null : (
        <div className="mt-5 flex justify-center">
          <SignInButton />
        </div>
      )}
      <div className="mt-10 flex justify-center">
        <img
          src={myImage}
          alt="イラスト画像"
          className="max-[500px]:w-4/5 max-[750px]:w-3/5"
        />
      </div>
      <div>
        {/* 横並びの四角の要素 */}
        <div className="flex flex-wrap justify-center mx-1 space-x-2 sm:space-x-3">
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
              className="w-full sm:max-w-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    addUserToDatabase(user.uid);
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center bg-black text-white py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-gray-700"
    >
      <FcGoogle />
      <p className="ml-1">ログインして始める</p>
    </button>
  );
}

async function addUserToDatabase(uid) {
  try {
    await axios.post("http://localhost:3010/users", { uid });
    console.log("UIDがRailsのAPIに送信されました");
  } catch (error) {
    console.error("RailsのAPIへのリクエスト中にエラーが発生しました:", error);
  }
}
