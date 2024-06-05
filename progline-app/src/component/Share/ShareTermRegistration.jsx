import React from "react";
import { Link } from "react-router-dom";

export default function ShareTermRegistration({ categories, shareCode }) {
  return (
    <div>
      <div className="grid grid-cols-2 min-[300px]:grid-cols-3 min-[400px]:grid-cols-4 min-[500px]:grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-8 2xl:grid-cols-10">
        {categories.map((category) => (
          <div key={category.id} className="w-20 md:w-28 mr-2 mt-2">
            <Link
              to={`/shareDetail/${shareCode}/${category.id}`}
              className="bg-white rounded-md p-4 cursor-pointer hover:bg-blue-200  w-20 h-20 md:w-28 md:h-28 flex flex-col justify-center"
            >
              <div>
                <div className="w-6 h-6 md:w-10 md:h-10 mx-auto">
                  {(category.image.url || category.original_url) && (
                    <img
                      src={category.image.url || category.original_url}
                      alt={category.name}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <p className="text-xs md:text-sm text-center mt-2 overflow-hidden">
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
