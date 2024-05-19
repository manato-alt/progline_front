import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SiQiita, SiUdemy, SiZenn } from "react-icons/si";
import { FaYoutube, FaAmazon } from "react-icons/fa";
import ShareServiceRegistration from "./ShareServiceRegistration";

export default function ShareDetail() {
  const [category, setCategory] = useState(null);
  const { categoryId } = useParams();
  const [services, setServices] = useState([]);

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
      if (categoryId) {
        // userとuser.uidが存在するかを確認
        try {
          const res = await axios.get(
            "http://localhost:3010/shared_codes/service_index",
            {
              params: {
                category_id: categoryId,
              },
            }
          );
          setServices(res.data);
        } catch (error) {
          console.error("Error fetching Services:", error);
        }
      }
    };

    fetchData();
  }, [categoryId]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3010/categories/${categoryId}`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  return (
    <div>
      <div className="flex items-center py-3 mx-6  min-[550px]:mx-14 min-[970px]:mx-32">
        {category && (
          <div className="flex p-2 items-center">
            <div className="w-8 h-8 min-[550px]:w-14 min-[550px]:h-14 mx-auto mr-4">
              <img
                src={category.image_url}
                alt={category.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="font-bold text-sm min-[350px]:text-base min-[550px]:text-lg">
              "{category.name}"に関する記録
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3 mx-4 min-[550px]:mx-14 min-[970px]:mx-32">
          <div className="font-bold">登録した媒体</div>
        </div>
        <div>
          <ShareServiceRegistration services={services} MediaIcon={MediaIcon} />
        </div>
      </div>
    </div>
  );
}
