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
  const [error, setError] = useState(null); // エラーステートの追加

  // カテゴリをクリックしたときのハンドラー
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // 登録ボタンがクリックされたときのハンドラー
  const handleRegistration = async () => {
    if (!selectedCategory) return; // カテゴリが選択されていない場合は何もしない

    try {
      // 選択されたカテゴリの情報を含めて API リクエストを送信
      await axios.post("http://localhost:3010/categories_template", {
        user_id: user.uid, // ログインユーザーのID
        category_id: selectedCategory, // 選択されたカテゴリのID
      });
      console.log("登録が成功しました");
      setSelectedCategory(null);
      closeModal();
      updateRegistrationCategories();
      setError(null);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors.join(", "));
      } else {
        setError("登録中にエラーが発生しました");
      }
    }
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}{" "}
      <div
        className="grid grid-cols-4 gap-4 border p-4 overflow-auto"
        style={{ maxHeight: "500px" }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className={`rounded-md p-4 overflow-hidden cursor-pointer hover:bg-blue-200 ${
              category.id === selectedCategory ? "bg-blue-200" : "bg-slate-100"
            }`}
            onClick={() => handleCategoryClick(category.id)} // カテゴリをクリックしたときのハンドラーを追加
          >
            <div className="w-8 h-8 mx-auto">
              <img
                src={category.image_url}
                alt={category.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm text-center mt-2">{category.name}</p>
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
