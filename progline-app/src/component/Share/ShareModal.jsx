import React, { useState, useEffect } from "react";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaCopy } from "react-icons/fa";
import { axiosInstance } from "../../utils/axios";

export default function ShareModal() {
  const [publicName, setPublicName] = useState("");
  const [code, setCode] = useState("");
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        // userとuser.uidが存在するかを確認
        try {
          const response = await axiosInstance.get("/shared_codes", {
            params: { user_id: user.uid },
          });

          // レスポンスデータがnullでないことを確認
          if (response.data) {
            setPublicName(response.data.public_name);
            setCode(response.data.code);
          }
        } catch (error) {
          console.error("データの取得エラー:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setErrorMessages([error.response.data.error]);
          } else {
            setErrorMessages(["カテゴリーの削除中にエラーが発生しました"]);
          }
        }
      }
    };

    fetchData();
  }, [user]);

  // 公開名を変更する関数
  const handleCreateOrUpdate = async () => {
    if (user && user.uid) {
      try {
        const response = await axiosInstance.post("/shared_codes/create_name", {
          user_id: user.uid,
          public_name: publicName,
        });
        console.log(response.data);
        setError("");
        setErrorMessages([]);
      } catch (error) {
        if (error.response && error.response.status === 422) {
          setError(error.response.data.error); // エラーメッセージを設定
        } else {
          setError("公開名の作成または更新エラー:" + error.message); // エラーメッセージを設定
        }
      }
    }
  };

  // シェアコードを生成する関数
  const handleGenerateCode = async () => {
    if (user && user.uid) {
      try {
        const response = await axiosInstance.post("/shared_codes/create_code", {
          user_id: user.uid,
          public_name: auth.currentUser.displayName,
        });
        setCode(response.data.shared_code.code);
        console.log(response.data.message);
        setError("");
        setErrorMessages([]);
      } catch (error) {
        console.error("シェアコードの生成エラー:", error);
      }
    }
  };

  // シェアコードを削除する関数
  const handleDeleteCode = async () => {
    if (user && user.uid) {
      try {
        const response = await axiosInstance.delete(
          "/shared_codes/delete_code",
          {
            params: { user_id: user.uid },
          }
        );
        setCode(response.data.shared_code.code);
        console.log(response.data.message);
        setError("");
        setErrorMessages([]);
      } catch (error) {
        console.error("シェアコードの削除エラー:", error);
      }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("コードがクリップボードにコピーされました");
      })
      .catch((err) => {
        console.error("コピーに失敗しました", err);
      });
  };

  return (
    <div className="">
      {errorMessages !== null &&
        // errorMessages が文字列か配列かで処理を分岐
        (typeof errorMessages === "string" ? (
          <p className="text-red-500 my-4">{errorMessages}</p>
        ) : (
          errorMessages.map((message, index) => (
            <p key={index} className="text-red-500 my-4">
              {message}
            </p>
          ))
        ))}
      {error && <div className="text-center text-red-500 mt-4">{error}</div>}{" "}
      {/* エラーメッセージの表示 */}
      <div className="pt-6">
        <div className="text-center">
          <div htmlFor="publicName" className="font-bold">
            公開名
          </div>
          <div className="">
            {publicName ||
              (auth.currentUser
                ? auth.currentUser.displayName
                : "ユーザー名が表示されます")}
          </div>
        </div>
        <div className="flex justify-center">
          <p className="mb-4 text-xs bg-yellow-100 text-yellow-700 border border-yellow-300 p-2 rounded text-center w-2/3">
            公開名が未設定の場合はユーザー名が表示されます
          </p>
        </div>
      </div>
      <div className="border-t-2">
        <div className="flex flex-col text-center">
          <label htmlFor="publicName" className="py-2 font-bold">
            公開名を変更
          </label>
          <div>
            <input
              type="text"
              id="publicName"
              value={publicName}
              onChange={(e) => setPublicName(e.target.value)}
              className="border p-1 rounded w-3/4"
            />
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleCreateOrUpdate}
            className="my-2 py-2 bg-cyan-500 text-white w-3/4 rounded hover:bg-cyan-400 transition duration-300 ease-in-out"
          >
            変更
          </button>
        </div>
      </div>
      <div className="mb-4 border-t-2">
        <div className="flex flex-col text-center">
          <label className="font-bold py-2">シェアコード</label>
          <div className="w-3/4 border p-1 mx-auto flex items-center">
            <span className="flex-grow">{code}</span>
            <button
              onClick={handleCopyCode}
              className="ml-2 p-1 hover:text-sky-500"
            >
              <FaCopy />
            </button>
          </div>
        </div>
        <div className="flex justify-center py-2">
          <button
            onClick={handleGenerateCode}
            className="bg-cyan-500 text-white w-1/3 mr-1 py-2 rounded hover:bg-cyan-400 transition duration-300 ease-in-out"
          >
            生成
          </button>
          <button
            onClick={handleDeleteCode}
            className="bg-red-400 text-white w-1/3 py-2 rounded hover:bg-red-500 transition duration-300 ease-in-out"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
