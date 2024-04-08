import React from "react";

export default function TermTemplate({ categories }) {
  return (
    <div>
      <div
        className="grid grid-cols-4 gap-4 border p-4 overflow-auto"
        style={{ maxHeight: "500px" }}
      >
        {categories.map((category) => (
          <div key={category.id} className="border p-4 overflow-hidden">
            <img
              src={category.image_url}
              alt={category.name}
              className="mx-auto"
            />
            <p className="text-sm text-center mt-2">{category.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-gray-300 py-2 px-10 rounded-lg font-semibold transition-colors hover:bg-gray-400">
          追加
        </button>
      </div>
    </div>
  );
}
