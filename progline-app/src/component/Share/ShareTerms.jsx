import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ShareTermRegistration from "./ShareTermRegistration";
import ShareTermGraph from "./ShareTermGraph";
import ShareEmptyCategory from "./ShareEmptyCategory";
import { axiosInstance } from "../../utils/axios";

export default function ShareTerms() {
  const { shareCode } = useParams();
  const [categories, setCategories] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [publicName, setPublicName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (shareCode) {
        // userとuser.uidが存在するかを確認
        try {
          const res = await axiosInstance.get("/shared_codes/term_index", {
            params: {
              code: shareCode,
            },
          });
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

  useEffect(() => {
    const fetchData = async () => {
      if (shareCode) {
        // userとuser.uidが存在するかを確認
        try {
          const res = await axiosInstance.get("/shared_codes/share_user", {
            params: {
              code: shareCode,
            },
          });
          setPublicName(res.data);
        } catch (error) {
          console.error("Error fetching User:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setErrorMessages([error.response.data.error]);
          } else {
            setErrorMessages(["ユーザーの取得中にエラーが発生しました"]);
          }
        }
      }
    };

    fetchData();
  }, [shareCode]);

  const fetchGraphData = useCallback(async () => {
    try {
      if (shareCode) {
        const res = await axiosInstance.get("/shared_codes/graph", {
          params: {
            code: shareCode,
          },
        });
        setGraphData(res.data);
      }
    } catch (error) {
      console.error("グラフデータの取得エラー:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessages(error.response.data.errors.join(", "));
      } else {
        setErrorMessages("登録中にエラーが発生しました");
      }
    }
  }, [shareCode]);

  useEffect(() => {
    fetchGraphData();
  }, [shareCode, fetchGraphData]);

  return (
    <div className="bg-[#f2f8f9] min-h-screen pt-16 px-[15px]">
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
          <div className="flex justify-center">
            <div className="my-5 w-full min-[1200px]:w-[1080px]  min-[1600px]:w-[1580px]">
              <div className="border-b border-slate-300 mb-[20px] pb-[10px] text-xl font-bold">
                {publicName ? `"${publicName}" さんの記録` : "記録"}
              </div>
              <div className="flex justify-between items-center mb-1">
                <div className="font-bold text-xl">カテゴリ</div>
              </div>
              <div>
                <ShareTermRegistration
                  categories={categories}
                  shareCode={shareCode}
                />
              </div>
            </div>
          </div>
          <div className="bg-white py-[50px] px-[20px] min-[1000px]:px-[100px] min-[1200px]:w-[1080px] min-[1600px]:w-[1580px] mx-auto">
            <ShareTermGraph graphData={graphData} />
          </div>
        </>
      )}
    </div>
  );
}
