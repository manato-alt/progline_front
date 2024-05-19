import React from "react";

export default function ShareContent({ contents }) {
  return (
    <div className="grid  grid-cols-1 min-[440px]:grid-cols-2 min-[600px]:grid-cols-3 min-[800px]:grid-cols-4 min-[1030px]:grid-cols-5 gap-4 mt-3">
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
          </div>
        ))}
      {!contents && <p>No content available.</p>}
    </div>
  );
}
