import React from "react";

export default function EmptyService({ handleShow, category }) {
  return (
    <div className="flex flex-col items-center h-[92vh] pt-28 bg-[#f7f9fb] px-8">
      {category && (
        <>
          {(category.image.url || category.original_url) && (
            <img
              src={category.image.url || category.original_url}
              alt="Logo"
              className="object-cover w-24 h-24 rounded-full"
            />
          )}
          <p className="mb-8 font-bold text-2xl">{category.name}</p>
        </>
      )}
      <p className="text-sm md:text-base mb-4">
        登録されたサービスはありません。
        <br />
        あなたの学習を記録しませんか？
      </p>
      <button
        onClick={handleShow}
        className="bg-white border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white py-2 px-4 rounded items-center mt-1 mr-2 transition duration-300 ease-in-out"
      >
        さっそく記録する！
      </button>
    </div>
  );
}
