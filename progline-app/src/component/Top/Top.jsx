import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import logo from "../../images/logo.png";
import Square from "./HoverSquare";
import gifImages from "./gifImages.jsx";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import TopPageImage from "../../images/TopPage.png";
import { axiosInstance } from "../../utils/axios.js";
import { Helmet } from "react-helmet-async";
import back from "../../images/back.jpg";
import Topback from "../../images/Topback.png";

export default function Top() {
  const [selectedImage, setSelectedImage] = useState("A");
  const [lastSelectedImage, setLastSelectedImage] = useState(null);
  const [user] = useAuthState(auth);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const dropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (image) => {
    setLastSelectedImage(null);
    setSelectedImage(image);
  };

  const searchShareCode = async (code) => {
    try {
      const response = await axiosInstance.post("/shared_codes/search", {
        code,
      });
      setSearchResults([{ public_name: response.data.public_name, code }]);
      setSearchError("");
    } catch (error) {
      console.error("シェアコードの検索エラー:", error);
      setSearchResults([]);
      setSearchError("シェアコードが見つかりません");
    }
  };

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
      await axiosInstance.post("/users", { uid });
      console.log("UIDがRailsのAPIに送信されました");
    } catch (error) {
      console.error("RailsのAPIへのリクエスト中にエラーが発生しました:", error);
    }
  }

  const textMappingTitle = {
    A: "学びの足跡を残そう、用語を手軽に登録",
    B: "学びの道筋を整理整頓、どのサービスで学んだかも一目瞭然",
    C: "学習サービスとコンテンツをスマートに紐づけ",
    D: "学びを見える化、用語ごとの学習量をグラフでチェック",
    E: "知識の交流を促進、自分の記録を公開し、他人の学びも参考に",
  };

  const textMapping = {
    A: "テンプレートやカスタム機能を使い学習した用語を手軽に登録できます。",
    B: "テンプレートやカスタム機能を使い学習に利用したサービスを手軽に登録できます。",
    C: "学習に利用したコンテンツをURLから自動でプレビュー生成し、簡単にサービスに紐付けられます。",
    D: "登録したコンテンツの数を用語別にグラフ化して可視化することで、学習量が一目でわかるようになります。",
    E: "共有機能を使って自分の記録を共有したり、他の人の記録を見ることができます。",
  };

  const getImageClass = (isMobile, selectedImage) => {
    if (isMobile && ["A", "B", "D"].includes(selectedImage)) {
      return "px-[60px]";
    }
    return "";
  };

  return (
    <div className="pb-[20px] min-[700px]:py-[50px]">
      <Helmet>
        <title>PROGLINE</title>
      </Helmet>
      <div
        style={{ backgroundImage: `url(${back})` }}
        className="bg-no-repeat w-screen h-[550px] min-[700px]:h-[650px] min-[700px]:bg-[length:100vw_650px] bg-cover"
      >
        <div className="flex justify-center items-center pt-[60px] min-[700px]:pt-[80px] mb-[50px] min-[700px]:mb-[70px]">
          <div className="text-center flex justify-center items-center flex-col">
            <img
              src={Topback}
              alt="Logo"
              className="w-[12rem] min-[700px]:w-[15rem]"
            />
            <h1 className="mt-[20px] min-[700px]:mt-[40px] text-white text-[2.4rem] min-[400px]:text-[2.6rem] min-[700px]:text-[3.6rem] font-bold tracking-widest leading-[1]">
              ITに特化した
              <br />
              学習メモリアル
            </h1>
          </div>
        </div>

        {user ? null : (
          <div className="flex justify-center mt-[-20px]">
            <SignInButton />
          </div>
        )}

        <div className="">
          <SearchForm onSearch={searchShareCode} />
          <div className="flex flex-col items-center">
            {searchResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-[85%] min-[700px]:w-[30rem]"
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
            {searchError && (
              <div className="mt-4 text-center text-red-500">
                <p>{searchError}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-[-130px] min-[700px]:mt-[-120px] px-[20px]">
        <div className=" flex justify-center">
          <img
            src={TopPageImage}
            alt="イラスト画像"
            className="w-[100%] min-[700px]:w-[80%] min-[1300px]:w-[60%] min-[1800px]:w-[43%]"
          />
        </div>
        <div className="flex flex-col justify-center items-center py-20">
          <img
            src={logo}
            alt="Logo"
            className="w-[13rem] min-[600px]:w-[15rem] min-[800px]:w-[20rem]"
          />
          <p className="mt-2 text-2xl min-[600px]:text-3xl min-[800px]:text-4xl font-serif text-center">
            「テンプレートを活用した
            <br />
            記録、共有機能で、
            <br />
            IT技術を向上させましょう。」
          </p>
        </div>
        <div>
          <div className="flex flex-wrap justify-center mx-[32px] space-x-2 sm:space-x-4">
            {["A", "B", "C", "D", "E"].map((item) => (
              <Square
                key={item}
                id={item}
                handleClick={handleClick}
                isSelected={
                  selectedImage === item || lastSelectedImage === item
                }
              />
            ))}
          </div>
          <div className="flex justify-center mt-4 max-[999px]:mt-[5px]">
            {(selectedImage || lastSelectedImage) && (
              <div className="bg-gray-100 p-[10px] min-[900px]:p-[30px] w-[950px] rounded-lg">
                <p className="text-center font-bold text-[18px] mb-[5px] max-[899px]:pt-3 max-[899px]:pl-3">
                  {textMappingTitle[selectedImage || lastSelectedImage]}
                </p>
                <p className="text-center mb-[30px] max-[899px]:pl-3">
                  {textMapping[selectedImage || lastSelectedImage]}
                </p>

                <img
                  src={
                    isMobile
                      ? gifImages.mb[selectedImage || lastSelectedImage]
                      : gifImages.pc[selectedImage || lastSelectedImage]
                  }
                  alt={`ダミー画像 ${selectedImage || lastSelectedImage}`}
                  className={`w-full pb-[10px] rounded-lg shadow-lg ${getImageClass(
                    isMobile,
                    selectedImage || lastSelectedImage
                  )}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
