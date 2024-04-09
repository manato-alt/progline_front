import React, { useState } from "react";
import SearchForm from "./SearchForm";
import UserList from "./UserList";
import myImage from "../../images/toppage.jpg";
import Square from "./HoverSquare";
import dummyImages from "./dummyImages.jsx";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export default function Top() {
  const [hoveredImage, setHoveredImage] = useState("A");
  const [lastHoveredImage, setLastHoveredImage] = useState(null);
  const [user] = useAuthState(auth);

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
      {user ? null : (
        <div className="mt-5 flex justify-center">
          <SignInButton />
        </div>
      )}
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

function SignInButton() {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // resultからユーザー情報を取得
    addUserToDatabase(user.uid);
    //firebaceを使ってGoogleでサインインする
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
    // RailsのAPIエンドポイントにUIDを送信
    await axios.post("http://localhost:3010/users", { uid });
    console.log("UIDがRailsのAPIに送信されました");
  } catch (error) {
    console.error("RailsのAPIへのリクエスト中にエラーが発生しました:", error);
  }
}
