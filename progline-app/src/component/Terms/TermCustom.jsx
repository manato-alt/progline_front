import React, { useState } from "react";

export default function TermCustom() {
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // 追加: 画像プレビューの状態

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでバックエンドへのデータ送信を行う
    console.log("画像ファイル:", imageFile);
    console.log("画像名:", imageName);
    // フォーム送信後に入力値をクリアする
    setImageFile(null);
    setImageName("");
    setImagePreview(null); // 追加: プレビューのクリア
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
            追加
          </button>
        </div>
      </form>
    </div>
  );
}
