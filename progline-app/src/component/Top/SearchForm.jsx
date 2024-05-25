import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [shareCode, setShareCode] = useState("");

  const handleSearch = () => {
    if (onSearch && shareCode) {
      onSearch(shareCode);
    }
  };

  return (
    <div className="flex justify-center items-center mt-7">
      <div className="w-3/4 min-[700px]:w-[30rem] flex justify-center">
        <input
          type="text"
          placeholder="共有コードを入力（ログイン不要）"
          value={shareCode}
          onChange={(e) => setShareCode(e.target.value)}
          className="border border-gray-300 bg-white h-10 py-6 px-5 pr-10 rounded-lg text-sm focus:outline-none w-full mr-2"
        />
      </div>
      <div>
        <button
          className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-400 transition duration-300 ease-in-out"
          onClick={handleSearch}
        >
          検索
        </button>
      </div>
    </div>
  );
}
