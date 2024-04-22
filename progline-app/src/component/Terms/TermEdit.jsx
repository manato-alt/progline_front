import React, { useState } from "react";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export default function TermEdit({
  closeModal,
  updateRegistrationCategories,
  category,
}) {
  const [editedCategory, setEditedCategory] = useState(category); // カテゴリー情報の編集用ステート
  const [user] = useAuthState(auth);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(category.image_url); // 画像プレビューの状態
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    let hasError = false;

    // 名前が入力されていない場合のエラーチェック
    if (!editedCategory.name.trim()) {
      setErrorMessages((prevMessages) => [
        ...prevMessages,
        "名称を入力してください",
      ]);
      hasError = true;
    }

    if (hasError) {
      // エラーがあればここで処理を中断
      return;
    }

    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image_file", imageFile);
      }
      formData.append("name", editedCategory.name);
      formData.append("user_id", user.uid);

      // カテゴリー情報の更新リクエストを送信
      await axios.put(
        `http://localhost:3010/categories/${user.uid}/${editedCategory.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("カテゴリーが編集されました");
      // 親コンポーネントに通知
      updateRegistrationCategories();
      // モーダルを閉じる
      closeModal();
    } catch (error) {
      console.error("カテゴリーの編集中にエラーが発生しました:", error);
      // エラー時の処理
    }
  };

  // 画像ファイルが選択されたときにプレビューを表示する関数
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(file);
      setImagePreview(reader.result); // 画像プレビューを設定
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {errorMessages.map((message, index) => (
          <p key={index} className="text-red-500 mb-4">
            {message}
          </p>
        ))}
        <label htmlFor="editImageInput" className="mb-2">
          画像:
        </label>
        <input
          type="file"
          id="editImageInput"
          onChange={handleImagePreview} // 画像選択時の処理
          accept="image/*"
          className="border rounded-md px-2 py-1 mb-4"
        />
        {/* 画像プレビュー */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="画像プレビュー"
            className="mb-4"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        )}
        <label htmlFor="editNameInput" className="mb-2">
          名称:
        </label>
        <input
          type="text"
          id="editNameInput"
          value={editedCategory.name}
          onChange={(e) =>
            setEditedCategory({ ...editedCategory, name: e.target.value })
          }
          className="border rounded-md px-2 py-1 mb-4"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-300 py-2 px-10 rounded-lg font-semibold transition-colors hover:bg-gray-400 w-[fit-content]"
          >
            更新
          </button>
        </div>
      </form>
    </div>
  );
}