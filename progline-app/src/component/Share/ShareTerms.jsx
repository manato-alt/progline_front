import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import myImage from "../../images/toppage-removebg.jpg";
import ShareTermRegistration from "./ShareTermRegistration";
import ShareTermGraph from "./ShareTermGraph";

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
      <div className="flex flex-col bg-[#f8f9fb] justify-center items-center  pt-5 sm:flex-row">
        <p className="text-xl mb-1 text-center mt-2 text-sky-500 font-bold sm:hidden">
          技術の道しるべ、
          <br />
          IT特化の学習メモリアル
        </p>

        <img
          src={myImage}
          alt="イラスト画像"
          className="object-contain w-2/3 sm:w-1/3"
        />
        <p className="hidden text-sky-500 font-bold sm:flex sm:text-start md:text-2xl lg:text-3xl ">
          技術の道しるべ、
          <br />
          IT特化の学習メモリアル
        </p>
      </div>
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
    </div>
  );
}
