import React from "react";
import NoContents from "../NoContents";

export default function ShareContent({ contents }) {
  return (
    <div className="bg-white p-5 mt-3">
      {contents && contents.length > 0 ? (
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1030px]:grid-cols-5 gap-4">
          {contents.map((content) => (
            <div
              key={content.id}
              className="pb-2 rounded-md border border-gray-300 hover:border-blue-500 hover:shadow-md"
            >
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block pb-5"
              >
                {(content.image.url || content.original_url) && (
                  <img
                    src={content.image.url || content.original_url}
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
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <NoContents />
        </div>
      )}
    </div>
  );
}
