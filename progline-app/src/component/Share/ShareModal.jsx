import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

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
          const response = await axios.get(
            "http://localhost:3010/shared_codes",
            {
              params: { user_id: user.uid },
            }
          );

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
        const response = await axios.post(
          "http://localhost:3010/shared_codes/create_name",
          {
            user_id: user.uid,
            public_name: publicName,
          }
        );
        console.log(response.data);
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
        const response = await axios.post(
          "http://localhost:3010/shared_codes/create_code",
          {
            user_id: user.uid,
            public_name: auth.currentUser.displayName,
          }
        );
        setCode(response.data.shared_code.code);
        console.log(response.data.message);
      } catch (error) {
        console.error("シェアコードの生成エラー:", error);
      }
    }
  };

  // シェアコードを削除する関数
  const handleDeleteCode = async () => {
    if (user && user.uid) {
      try {
        const response = await axios.delete(
          "http://localhost:3010/shared_codes/delete_code",
          {
            params: { user_id: user.uid },
          }
        );
        setCode(response.data.shared_code.code);
        console.log(response.data.message);
      } catch (error) {
        console.error("シェアコードの削除エラー:", error);
      }
    }
  };

  return (
    <div className="p-4">
      {errorMessages !== null &&
        // errorMessages が文字列か配列かで処理を分岐
        (typeof errorMessages === "string" ? (
          <p className="text-red-500 mb-4">{errorMessages}</p>
        ) : (
          errorMessages.map((message, index) => (
            <p key={index} className="text-red-500 mb-4">
              {message}
            </p>
          ))
        ))}
      {error && <div className="text-red-500 mb-1">{error}</div>}{" "}
      {/* エラーメッセージの表示 */}
      <div className="flex">
        <label htmlFor="publicName" className="mr-2">
          現在の公開名：
        </label>
        <p>
          {publicName ||
            (auth.currentUser
              ? auth.currentUser.displayName
              : "ユーザー名が表示されます")}
        </p>
      </div>
      <div className="mb-4 text-xs bg-yellow-100 text-yellow-700 border border-yellow-300 p-2 rounded">
        <p>公開名が未設定の場合はユーザー名が表示されます</p>
      </div>
      <div className="mb-4 min-[500px]:flex">
        <div className="">
          <label htmlFor="publicName" className="mr-2">
            公開名を変更：
          </label>
          <input
            type="text"
            id="publicName"
            value={publicName}
            onChange={(e) => setPublicName(e.target.value)}
            className="border p-1 rounded max-[500px]:w-full"
          />
        </div>
        <div className="text-end">
          <button
            onClick={handleCreateOrUpdate}
            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            変更
          </button>
        </div>
      </div>
      <div className="min-[550px]:flex">
        <div>
          <label className="mr-2">シェアコード：</label>
          <span className="mr-2">{code}</span>
        </div>
        <div className="text-end">
          <button
            onClick={handleGenerateCode}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            生成
          </button>
          <button
            onClick={handleDeleteCode}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
