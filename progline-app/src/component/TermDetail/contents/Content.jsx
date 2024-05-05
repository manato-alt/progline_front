import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Content({ contents, updateContents }) {
  const [user] = useAuthState(auth);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleDelete = async (content_id) => {
    try {
      await axios.delete(`http://localhost:3010/contents/${content_id}`);
      updateContents();
      // 削除後にコンテンツを再取得して更新
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <div className="container grid grid-cols-5 gap-4 mx-auto mt-3">
      {contents &&
        contents.map((content) => (
          <div
            key={content.id}
            className="p-4 rounded-md border border-gray-300 hover:border-blue-500 hover:shadow-md relative"
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
                  className="block mx-auto mb-2"
                  style={{ maxHeight: "200px", width: "auto" }}
                />
              )}
              <h3 className="text-lg font-semibold mb-1">
                {content.title.length > 30
                  ? `${content.title.slice(0, 30)}...`
                  : content.title}
              </h3>
              <div className="flex items-center mt-2">
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
              className="absolute right-4 bottom-2 p-2 cursor-pointer transition duration-300 transform hover:scale-110"
              onClick={() => setSelectedContent(content)}
            >
              <RiDeleteBinLine />
            </div>
          </div>
        ))}
      {!contents && <p>No content available.</p>}

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
