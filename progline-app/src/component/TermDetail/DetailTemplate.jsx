import React, { useState } from "react";
import axios from "axios";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { SiQiita, SiUdemy, SiZenn } from "react-icons/si";
import { FaYoutube, FaAmazon } from "react-icons/fa";

export default function DetailTemplate({
  services,
  closeModal,
  category,
  updateRegistrationServices,
}) {
  const [selectedService, setSelectedService] = useState(null);
  const [user] = useAuthState(auth);
  const [error, setError] = useState(null); // エラーステートの追加

  const handleServiceClick = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleRegistration = async () => {
    if (!selectedService) return; // カテゴリが選択されていない場合は何もしない

    try {
      // 選択されたカテゴリの情報を含めて API リクエストを送信
      await axios.post("http://localhost:3010/service_registrations", {
        user_id: user.uid, // ログインユーザーのID
        service_id: selectedService,
        category_id: category.id,
        // 選択されたサービスのID
      });
      console.log("登録が成功しました");
      setSelectedService(null);
      closeModal();
      updateRegistrationServices();
      setError(null);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors.join(", "));
      } else {
        setError("登録中にエラーが発生しました");
      }
    }
  };

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

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* エラーメッセージの表示 */}
      <div
        className="grid grid-cols-2 gap-4 border p-4 overflow-auto"
        style={{ maxHeight: "500px" }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className={`flex items-center justify-center rounded-md p-4 overflow-hidden cursor-pointer hover:bg-blue-200 ${
              service.id === selectedService ? "bg-blue-200" : "bg-slate-100"
            }`}
            onClick={() => handleServiceClick(service.id)} // カテゴリをクリックしたときのハンドラーを追加
          >
            <div className="mr-2">
              <MediaIcon name={service.name} />
            </div>
            <div>
              <p className="font-bold">{service.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleRegistration}
          className="bg-gray-300 py-2 px-10 rounded-lg font-semibold transition-colors hover:bg-gray-400"
        >
          登録
        </button>
      </div>
    </div>
  );
}
