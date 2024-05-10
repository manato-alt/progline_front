import React, { useState } from "react";
import axios from "axios";

export default function DetailCustom({
  closeModal,
  category,
  updateRegistrationServices,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // 追加: 画像プレビューの状態
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessages([]);
    let hasError = false; // エラーフラグを追加

    // 画像が選択されていない場合のエラーチェック
    if (!imageFile) {
      setErrorMessages((prevMessages) => [
        ...prevMessages,
        "画像を選択してください",
      ]);
      hasError = true;
    }

    // 名前が入力されていない場合のエラーチェック
    if (!imageName.trim()) {
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
      formData.append("image_file", imageFile);
      formData.append("name", imageName);
      formData.append("category_id", category.id);

      await axios.post("http://localhost:3010/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("登録が成功しました");
      closeModal();
      updateRegistrationServices();
      setImageFile(null);
      setImageName("");
      setImagePreview(null);
    } catch (error) {
      console.error("登録中にエラーが発生しました:", error);
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
        <label htmlFor="imageInput" className="mb-2">
          画像:
        </label>
        <input
          type="file"
          id="imageInput"
          onChange={handleImagePreview} // 変更: handleImagePreview関数を使用
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
        <label htmlFor="imageName" className="mb-2">
          名称:
        </label>
        <input
          type="text"
          id="imageName"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          className="border rounded-md px-2 py-1 mb-4"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-300 py-2 px-10 rounded-lg font-semibold transition-colors hover:bg-gray-400 w-[fit-content]"
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
