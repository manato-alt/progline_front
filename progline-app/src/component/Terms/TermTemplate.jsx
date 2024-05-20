import React, { useState } from "react";
import axios from "axios";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

export default function TermTemplate({
  categories,
  closeModal,
  updateRegistrationCategories,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null); // 選択されたカテゴリのIDを保持するステート
  const [user] = useAuthState(auth);
  const [errorMessages, setErrorMessages] = useState([]);

  // カテゴリをクリックしたときのハンドラー
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // 登録ボタンがクリックされたときのハンドラー
  const handleRegistration = async () => {
    if (!selectedCategory) return; // カテゴリが選択されていない場合は何もしない

    try {
      // 選択されたカテゴリの情報を含めて API リクエストを送信
      await axios.post("http://localhost:3010/template_categories", {
        user_id: user.uid, // ログインユーザーのID
        category_id: selectedCategory, // 選択されたカテゴリのID
      });
      console.log("登録が成功しました");
      setSelectedCategory(null);
      closeModal();
      updateRegistrationCategories();
      setErrorMessages(null);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessages(error.response.data.errors.join(", "));
      } else {
        setErrorMessages("登録中にエラーが発生しました");
      }
    }
  };

  return (
    <div>
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
      <div
        className="grid grid-cols-2 min-[400px]:grid-cols-3 min-[680px]:grid-cols-4 gap-4 border p-4 overflow-auto"
        style={{ maxHeight: "500px" }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className={`w-20 h-20 min-[860px]:w-24 min-[860px]:h-24 rounded-md p-4 overflow-hidden cursor-pointer hover:bg-blue-200 ${
              category.id === selectedCategory ? "bg-blue-200" : "bg-slate-100"
            }`}
            onClick={() => handleCategoryClick(category.id)} // カテゴリをクリックしたときのハンドラーを追加
          >
            <div className="w-5 h-5 min-[860px]:w-8 min-[860px]:h-8 mx-auto">
              <img
                src={category.image_url}
                alt={category.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-xs min-[860px]:text-sm text-center mt-2">
              {category.name}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleRegistration} // 登録ボタンがクリックされたときのハンドラーを追加
          className="bg-gray-300 py-2 px-10 rounded-lg font-semibold transition-colors hover:bg-gray-400"
        >
          登録
        </button>
      </div>
    </div>
  );
}
