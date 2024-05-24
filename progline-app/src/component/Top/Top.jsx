import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchForm from "./SearchForm";
import logo from "../../images/logo.png";
import Square from "./HoverSquare";
import dummyImages from "./dummyImages.jsx";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import myImage_second from "../../images/270x180.png";

export default function Top() {
  const [selectedImage, setSelectedImage] = useState("A");
  const [lastSelectedImage, setLastSelectedImage] = useState(null);
  const [user] = useAuthState(auth);
  const [searchResults, setSearchResults] = useState([]); // 検索結果の状態追加
  const [searchError, setSearchError] = useState(""); // エラーメッセージの状態追加
  const dropdownRef = useRef(null); // ドロップダウンのrefを追加

  const handleClick = (image) => {
    setLastSelectedImage(null);
    setSelectedImage(image);
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
    <div className="py-20">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-widest md:text-4xl lg:text-[3.5rem]">
            IT技術の道しるべ
          </h1>
          <p className="mt-4 mx-auto sm:text-[1.3rem]">
            テンプレートを活用した記録、共有機能で、
            <br />
            IT技術を向上させましょう。
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
        <img src={myImage_second} alt="イラスト画像" className="w-1/3" />
      </div>
      <div className="flex flex-col justify-center items-center py-24">
        <img src={logo} alt="Logo" className="w-1/6" />
        <p className="text-4xl font-serif w-1/5 text-center">
          「ITに特化した学習メモリアルです。」
        </p>
      </div>
      <div>
        {/* 横並びの四角の要素 */}
        <div className="flex flex-wrap justify-center mx-1 space-x-2 sm:space-x-4">
          {["A", "B", "C", "D", "E"].map((item) => (
            <Square
              key={item}
              id={item}
              handleClick={handleClick}
              isSelected={selectedImage === item || lastSelectedImage === item}
            />
          ))}
        </div>
        {/* 画像 */}
        <div className="flex justify-center">
          {(selectedImage || lastSelectedImage) && (
            <img
              src={dummyImages[selectedImage || lastSelectedImage]}
              alt={`ダミー画像 ${selectedImage || lastSelectedImage}`}
              className="w-full sm:max-w-lg transition-transform duration-500 ease-in-out transform-gpu"
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
