import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SiQiita, SiUdemy, SiZenn } from "react-icons/si";
import { FaYoutube, FaAmazon } from "react-icons/fa";
import { Modal, Button } from "react-daisyui";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import DetailTemplate from "./DetailTemplate";
import DetailCustom from "./DetailCustom";
import ServiceRegistration from "./ServiceRegistration";

export default function TermDetail() {
  const [category, setCategory] = useState(null);
  const { categoryId } = useParams();
  const [services, setServices] = useState([]);
  const [isTemplate, setIsTemplate] = useState(true);
  const ref = useRef(null);
  const [user] = useAuthState(auth);
  const [registrationServices, setRegistrationServices] = useState([]);

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
      if (user && user.uid) {
        // userとuser.uidが存在するかを確認
        try {
          console.log(categoryId);
          const res = await axios.get(
            "http://localhost:3010/service_registrations",
            {
              params: {
                user_id: user.uid,
                category_id: categoryId,
              },
            }
          );
          setRegistrationServices(res.data);
        } catch (error) {
          console.error("Error fetching registrationServices:", error);
        }
      }
    };

    fetchData();
  }, [user]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3010/services");
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const toggleTemplate = () => {
    setIsTemplate(!isTemplate);
  };

  const handleCloseModal = () => {
    ref.current?.close();
  };

  const updateRegistrationServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3010/service_registrations",
        {
          params: {
            user_id: user.uid,
            category_id: categoryId,
          },
        }
      );
      setRegistrationServices(res.data);
    } catch (error) {
      console.error("Error fetching registrationServices:", error);
    }
  };

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
      <div className="border p-5  my-5 mx-32">
        <div className="flex justify-between items-center mb-3">
          <div>登録した媒体</div>
          <div>
            <button
              onClick={handleShow}
              className="bg-gray-300 py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-gray-400"
            >
              媒体を追加
            </button>
          </div>
        </div>
        <div>
          <ServiceRegistration
            registrationServices={registrationServices}
            MediaIcon={MediaIcon}
          />
        </div>
      </div>
      <div>媒体をクリックするとそれに付随するコンテンツを表示</div>
      <Modal ref={ref}>
        {/* モーダルの状態を isOpen で制御 */}
        <form method="dialog">
          <Button
            size="sm"
            color="ghost"
            shape="circle"
            className="absolute right-2 top-2"
          >
            x
          </Button>
        </form>
        <Modal.Header className="font-bold">
          {isTemplate ? (
            <>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                テンプレート
              </button>
              <button
                onClick={toggleTemplate}
                className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                カスタム
              </button>
            </>
          ) : (
            /* カスタムの内容 */
            <>
              <button
                onClick={toggleTemplate}
                className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                テンプレート
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                カスタム
              </button>
            </>
          )}
        </Modal.Header>
        <Modal.Body>
          {/* テンプレートとカスタムの内容をここに記述 */}
          {isTemplate ? (
            /* テンプレートの内容 */
            <DetailTemplate
              services={services}
              closeModal={handleCloseModal}
              category={category}
              updateRegistrationServices={updateRegistrationServices}
              MediaIcon={MediaIcon}
            />
          ) : (
            /* カスタムの内容 */
            <DetailCustom closeModal={handleCloseModal} />
          )}
          {/* 切り替えるボタン */}
        </Modal.Body>
      </Modal>
    </div>
  );
}
