import React from "react";
import { Link } from "react-router-dom";

export default function ShareTermRegistration({ categories, shareCode }) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center my-2">
        <p className=" text-sm">
          ※ 各カテゴリをクリックすることで詳細ページへ遷移できます
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="w-full">
            <Link to={`/shareDetail/${shareCode}/${category.id}`}>
              <div className="p-4 flex flex-col items-center">
                <div className="w-24 h-24 border bg-white border-cyan-500 rounded-full flex justify-center items-center">
                  {(category.image.url || category.original_url) && (
                    <img
                      src={category.image.url || category.original_url}
                      alt={category.name}
                      className="object-cover w-16 h-16 rounded"
                    />
                  )}
                </div>
                <p className="text-xs md:text-sm text-center mt-1 overflow-hidden">
                  {category.name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
