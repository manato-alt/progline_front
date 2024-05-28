import React, { useState } from "react";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import NoContents from "../../NoContents";

export default function Content({ contents, updateContents }) {
  const [selectedContent, setSelectedContent] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleDelete = async (content_id) => {
    try {
      await axios.delete(`http://localhost:3010/contents/${content_id}`);
      updateContents();
      // 削除後にコンテンツを再取得して更新
    } catch (error) {
      console.error("Error deleting content:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessages(error.response.data.errors.join(", "));
      } else {
        setErrorMessages("コンテンツの削除中にエラーが発生しました");
      }
    }
  };

  return (
    <div className="bg-white p-5 mt-3">
      {errorMessages.length > 0 &&
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
      {contents && contents.length > 0 ? (
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1030px]:grid-cols-5 gap-4">
          {contents.map((content) => (
            <div
              key={content.id}
              className="pb-2 rounded-md border border-gray-300 hover:border-blue-500 hover:shadow-md relative"
            >
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block pb-5"
              >
                {content.image_url && (
                  <img
                    src={content.image_url}
                    alt=""
                    className="block mx-auto mb-2 rounded"
                    style={{ maxHeight: "200px", width: "auto" }}
                  />
                )}
                <h3 className="px-1 text-base font-semibold mb-1">
                  {content.title.length > 30
                    ? `${content.title.slice(0, 30)}...`
                    : content.title}
                </h3>
                <div className="flex items-center mt-2 px-2">
                  {content.favicon_url && (
                    <img
                      src={content.favicon_url}
                      alt="Favicon"
                      className="mr-2"
                      style={{ width: "16px", height: "16px" }}
                    />
                  )}
                  <span className="text-sm text-gray-500 truncate">
                    {content.url}
                  </span>
                </div>
              </a>
              <div
                className="absolute right-3 bottom-0 p-2 cursor-pointer transition duration-300 transform hover:scale-110"
                onClick={() => setSelectedContent(content)}
              >
                <RiDeleteBinLine />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <NoContents />
        </div>
      )}

      {/* 確認ダイアログ */}
      {selectedContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p>削除しますか？</p>
            <div className="flex justify-end mt-2">
              <button
                className="bg-red-100 px-4 py-2 rounded-md mr-2 flex items-center hover:bg-red-300"
                onClick={() => {
                  handleDelete(selectedContent.id);
                  setSelectedContent(null);
                }}
              >
                <RiDeleteBinLine className="mr-2" style={{ color: "red" }} />
                <p className="text-red-500">はい</p>
              </button>
              <button
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-300"
                onClick={() => setSelectedContent(null)}
              >
                <AiOutlineExclamationCircle className="mr-2" />
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
