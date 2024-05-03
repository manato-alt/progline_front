import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Content({ service }) {
  const [user] = useAuthState(auth);
  const [contents, setContents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && service) {
          // userとserviceがnullでないことを確認
          const response = await axios.get("http://localhost:3010/contents", {
            params: {
              user_id: user.uid,
              service_id: service.id,
            },
          });
          setContents(response.data);
        }
      } catch (error) {
        console.error("コンテンツの取得中にエラーが発生しました:", error);
      }
    };

    fetchData();
  }, [user, service]);

  // コンテンツを表示
  return (
    <div className="container grid grid-cols-5 gap-4 mx-auto mt-3">
      {contents &&
        contents.map((content) => (
          <a
            key={content.id}
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-md border border-gray-300 hover:border-blue-500 hover:shadow-md"
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
        ))}
      {!contents && <p>No content available.</p>}
    </div>
  );
}
