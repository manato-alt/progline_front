import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ShareTermRegistration from "./ShareTermRegistration";
import ShareTermGraph from "./ShareTermGraph";
import ShareEmptyCategory from "./ShareEmptyCategory";

export default function ShareTerms() {
  const { shareCode } = useParams();
  const [categories, setCategories] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (shareCode) {
        // userとuser.uidが存在するかを確認
        try {
          const res = await axios.get(
            "http://localhost:3010/shared_codes/term_index",
            {
              params: {
                code: shareCode,
              },
            }
          );
          setCategories(res.data);
        } catch (error) {
          console.error("Error fetching Categories:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setErrorMessages([error.response.data.error]);
          } else {
            setErrorMessages(["カテゴリー取得中にエラーが発生しました"]);
          }
        }
      }
    };

    fetchData();
  }, [shareCode]);

  return (
    <div>
      {errorMessages !== null &&
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
      {categories.length === 0 ? (
        <ShareEmptyCategory />
      ) : (
        <>
          <div>
            <div className="my-5 p-5 ml-4  min-[1300px]:mx-32">
              <div className="flex justify-between items-center mb-3">
                <div className="font-bold">登録したカテゴリ</div>
              </div>
              <div>
                <ShareTermRegistration
                  categories={categories}
                  shareCode={shareCode}
                />
              </div>
            </div>
          </div>
          <div className="mx-5 min-[500px]:mx-10 sm:mx-20 mb-10">
            <ShareTermGraph shareCode={shareCode} />
          </div>
        </>
      )}
    </div>
  );
}
