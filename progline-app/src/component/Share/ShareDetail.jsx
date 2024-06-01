import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SiQiita, SiUdemy, SiZenn } from "react-icons/si";
import { FaYoutube, FaAmazon } from "react-icons/fa";
import ShareServiceRegistration from "./ShareServiceRegistration";
import ShareEmptyService from "./ShareEmptyService";
import { axiosInstance } from "../../utils/axios";

export default function ShareDetail() {
  const [category, setCategory] = useState(null);
  const { shareCode, categoryId } = useParams();
  const [services, setServices] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  function MediaIcon({ name }) {
    switch (name) {
      case "Youtube":
        return <FaYoutube />;
      case "Udemy":
        return <SiUdemy />;
      case "Qiita":
        return <SiQiita />;
      case "Zenn":
        return <SiZenn />;
      case "書籍":
        return <FaAmazon />;
      default:
        return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if ((categoryId, shareCode)) {
        try {
          const res = await axiosInstance.get("/shared_codes/service_index", {
            params: {
              category_id: categoryId,
              code: shareCode,
            },
          });
          setServices(res.data);
        } catch (error) {
          console.error("Error fetching Services:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setErrorMessages([error.response.data.error]);
          } else {
            setErrorMessages(["サービスの取得中にエラーが発生しました"]);
          }
        }
      }
    };

    fetchData();
  }, [categoryId, shareCode]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${categoryId}`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  return (
    <div className="bg-[#f2f8f9] min-h-screen pt-20 px-[15px]">
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
      {services.length === 0 ? (
        <ShareEmptyService category={category} shareCode={shareCode} />
      ) : (
        <div>
          <div className="flex justify-center mb-9">
            {category && (
              <div className="flex items-center p-[10px] min-[700px]:p-[20px] bg-white w-[1250px] h-[90px] min-[700px]:h-[110px] rounded">
                <div className="h-[30px] w-[30px] ml-6 mr-4">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="font-bold text-sm min-[350px]:text-base min-[700px]:text-lg">
                  "{category.name}"に関する記録
                </div>
              </div>
            )}
          </div>
          <div>
            <div>
              <ShareServiceRegistration
                services={services}
                MediaIcon={MediaIcon}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
