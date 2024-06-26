import React, { useState } from "react";
import { axiosInstance } from "../../utils/axios";

export default function ServiceEdit({
  closeModal,
  updateRegistrationServices,
  service,
}) {
  const [editedService, setEditedService] = useState(service || {}); // カテゴリー情報の編集用ステート
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    service?.image.url || service?.original_url
  ); // 画像プレビューの状態
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("service[image]", imageFile);
      }
      formData.append("service[name]", editedService.name);

      // カテゴリー情報の更新リクエストを送信
      await axiosInstance.put(`/services/${editedService.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("サービスが編集されました");
      // 親コンポーネントに通知
      updateRegistrationServices();
      // モーダルを閉じる
      closeModal();
    } catch (error) {
      console.error("サービスの編集中にエラーが発生しました:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessages([error.response.data.error]);
      } else {
        setErrorMessages(["サービスの編集中にエラーが発生しました"]);
      }

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
          ))}{" "}
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
          value={editedService.name || ""}
          onChange={(e) =>
            setEditedService({ ...editedService, name: e.target.value })
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
