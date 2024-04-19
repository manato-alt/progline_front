import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TermDetail() {
  const [category, setCategory] = useState(null);
  const { categoryId } = useParams();

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
      <div className="flex items-center py-5 mx-32">
        {category && (
          <div className="flex p-2 items-center">
            <div className="w-14 h-14 mx-auto mr-4">
              <img
                src={category.image_url}
                alt={category.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="font-bold text-lg">
              "{category.name}"に関する記録
            </div>
          </div>
        )}
      </div>
      <div className="border flex justify-between p-5  my-5 mx-32">
        <div>登録した媒体</div>
        <div>
          <button className="bg-gray-300 py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-gray-400">
            媒体を追加
          </button>
        </div>
      </div>
      <div>媒体をクリックするとそれに付随するコンテンツを表示</div>
    </div>
  );
}
