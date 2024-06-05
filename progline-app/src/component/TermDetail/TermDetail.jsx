import React, { useRef, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { SiQiita, SiUdemy, SiZenn } from "react-icons/si";
import { FaYoutube, FaAmazon } from "react-icons/fa";
import { Modal, Button } from "react-daisyui";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import DetailTemplate from "./DetailTemplate";
import DetailCustom from "./DetailCustom";
import ServiceRegistration from "./ServiceRegistration";
import EmptyService from "./EmptyService";
import { axiosInstance } from "../../utils/axios";

export default function TermDetail() {
  const [category, setCategory] = useState(null);
  const { categoryId } = useParams();
  const [services, setServices] = useState([]);
  const [isTemplate, setIsTemplate] = useState(true);
  const ref = useRef(null);
  const [user] = useAuthState(auth);
  const [registrationServices, setRegistrationServices] = useState([]);
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
      if (user && user.uid) {
        // userとuser.uidが存在するかを確認
        try {
          const res = await axiosInstance.get("/services", {
            params: {
              category_id: categoryId,
            },
          });
          setRegistrationServices(res.data);
        } catch (error) {
          console.error("Error fetching registrationServices:", error);
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
  }, [user, categoryId]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${categoryId}`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrorMessages([error.response.data.error]);
        } else {
          setErrorMessages(["カテゴリーの取得中にエラーが発生しました"]);
        }
      }
    };

    fetchCategory();
  }, [categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/template_services");
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrorMessages([error.response.data.error]);
        } else {
          setErrorMessages([
            "テンプレートサービスの取得中にエラーが発生しました",
          ]);
        }
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
      const res = await axiosInstance.get("/services", {
        params: {
          category_id: categoryId,
        },
      });
      setRegistrationServices(res.data);
    } catch (error) {
      console.error("Error fetching registrationServices:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessages([error.response.data.error]);
      } else {
        setErrorMessages(["サービスの取得中にエラーが発生しました"]);
      }
    }
  };

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
        ))}{" "}
      {registrationServices.length === 0 ? (
        <EmptyService handleShow={handleShow} category={category} />
      ) : (
        <div>
          <div className="flex justify-center mb-9">
            {category && (
              <div className="flex items-center p-[10px] min-[700px]:p-[20px] bg-white w-[1250px] h-[90px] min-[700px]:h-[110px] rounded">
                <div className="h-[30px] w-[30px] ml-6 mr-4">
                  {category.image.url || category.original_url ? (
                    <img
                      src={category.image.url || category.original_url}
                      alt={category.name}
                      className="object-cover w-full h-full"
                    />
                  ) : null}
                </div>
                <div className="font-bold text-sm min-[350px]:text-base min-[700px]:text-lg">
                  "{category.name}"に関する記録
                </div>
              </div>
            )}
          </div>
          <div>
            <div>
              <ServiceRegistration
                registrationServices={registrationServices}
                MediaIcon={MediaIcon}
                updateRegistrationServices={updateRegistrationServices}
                handleShow_detail={handleShow}
                category={category}
              />
            </div>
          </div>
        </div>
      )}
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
                <p className="text-sm min-[500px]:text-base">テンプレート</p>
              </button>
              <button
                onClick={toggleTemplate}
                className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                <p className="text-sm min-[500px]:text-base">カスタム</p>
              </button>
            </>
          ) : (
            /* カスタムの内容 */
            <>
              <button
                onClick={toggleTemplate}
                className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                <p className="text-sm min-[500px]:text-base">テンプレート</p>
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                <p className="text-sm min-[500px]:text-base">カスタム</p>
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
            <DetailCustom
              closeModal={handleCloseModal}
              category={category}
              updateRegistrationServices={updateRegistrationServices}
            />
          )}
          {/* 切り替えるボタン */}
        </Modal.Body>
      </Modal>
    </div>
  );
}
