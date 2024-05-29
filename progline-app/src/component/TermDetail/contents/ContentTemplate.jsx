import React, { useState } from "react";
import axios from "axios";

export default function ContentTemplate({
  service,
  closeModal,
  updateContents,
  handleCancelEditing,
}) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ローディング状態を管理

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessages([]);
    setIsLoading(true); // ローディング開始
    try {
      const formData = new FormData();
      formData.append("url", url);
      formData.append("service_id", service.id);

      await axios.post("http://localhost:3010/contents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      updateContents();
      closeModal();
      handleCancelEditing();
      console.log("登録が成功しました");
    } catch (error) {
      console.error("登録中にエラーが発生しました:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessages(error.response.data.errors.join(", "));
      } else {
        setErrorMessages("登録中にエラーが発生しました");
      }
    } finally {
      setIsLoading(false); // ローディング終了
      setUrl(""); // フォーム送信後に入力値をクリア
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {errorMessages !== null &&
          (typeof errorMessages === "string" ? (
            <p className="text-red-500 mb-4">{errorMessages}</p>
          ) : (
            errorMessages.map((message, index) => (
              <p key={index} className="text-red-500 mb-4">
                {message}
              </p>
            ))
          ))}
        <label htmlFor="url" className="mb-2">
          URLの記入ででプレビューを自動作成します
        </label>
        <input
          type="text"
          id="url"
          value={url}
          placeholder="https://example.com"
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded-md px-2 py-1 mb-4"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-300 py-2 px-10 rounded-lg font-semibold transition-colors hover:bg-gray-400 w-[fit-content]"
            disabled={isLoading} // ローディング中はボタンを無効化
          >
            {isLoading ? "登録中..." : "登録"}
          </button>
        </div>
        {isLoading && <div className="text-center mt-4">登録中です...</div>}{" "}
        {/* ローディングインジケーター */}
      </form>
    </div>
  );
}
