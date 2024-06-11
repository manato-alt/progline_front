import React, { useRef, useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-daisyui";
import TermTemplate from "./TermTemplate";
import TermCustom from "./TermCustom";
import TermRegistration from "./TermRegistration";
import TermGraph from "./TermGraph";
import EmptyCategory from "./EmptyCategory";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { axiosInstance } from "../../utils/axios";
import { Helmet } from "react-helmet-async";

export default function Terms() {
  const [categories, setCategories] = useState([]);
  const [registrationCategories, setRegistrationCategories] = useState([]);
  const [isTemplate, setIsTemplate] = useState(true);
  const ref = useRef(null);
  const [user] = useAuthState(auth);
  const [errorMessages, setErrorMessages] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [activeTab, setActiveTab] = useState("registration");

  const fetchGraphData = useCallback(async () => {
    try {
      if (user && user.uid) {
        const res = await axiosInstance.get("/graphs", {
          params: {
            user_id: user.uid,
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
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/template_categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setErrorMessages(error.response.data.errors.join(", "));
        } else {
          setErrorMessages(
            "テンプレートカテゴリーの取得中にエラーが発生しました"
          );
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        try {
          const res = await axiosInstance.get("/categories", {
            params: {
              user_id: user.uid,
            },
          });
          setRegistrationCategories(res.data);
          fetchGraphData();
        } catch (error) {
          console.error("Error fetching registrationCategories:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            setErrorMessages(error.response.data.errors.join(", "));
          } else {
            setErrorMessages("カテゴリーの取得中にエラーが発生しました");
          }
        }
      }
    };

    fetchData();
  }, [user, fetchGraphData]);

  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const toggleTemplate = () => {
    setIsTemplate(!isTemplate);
  };

  const handleCloseModal = () => {
    ref.current?.close();
  };

  const updateRegistrationCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories", {
        params: {
          user_id: user.uid,
        },
      });
      setRegistrationCategories(res.data);
      fetchGraphData();
    } catch (error) {
      console.error("Error fetching registrationCategories:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessages(error.response.data.errors.join(", "));
      } else {
        setErrorMessages("カテゴリーの取得中にエラーが発生しました");
      }
    }
  };

  return (
    <div className="bg-[#f2f8f9] min-h-screen pt-20 px-[15px]">
      <Helmet>
        <title>用語一覧 | PROGLINE</title>
      </Helmet>

      {errorMessages.length > 0 &&
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

      {registrationCategories.length === 0 ? (
        <EmptyCategory handleShow={handleShow} />
      ) : (
        <>
          <div className="flex justify-center">
            <div className="my-5 w-full min-[1200px]:w-[1080px]  min-[1600px]:w-[1580px]">
              <div className="flex mb-4 justify-center border-b pb-[10px] border-slate-300">
                <button
                  className={`px-4 py-2 mx-2 rounded-lg transition duration-300 ${
                    activeTab === "registration"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveTab("registration")}
                >
                  カテゴリ
                </button>
                <button
                  className={`px-4 py-2 mx-2 rounded-lg transition duration-300 ${
                    activeTab === "graph"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveTab("graph")}
                >
                  グラフ
                </button>
              </div>

              <div>
                {activeTab === "registration" ? (
                  <div>
                    <div className="min-[700px]:hidden">
                      <button
                        onClick={handleShow}
                        className="w-full max-[500px]:text-sm bg-white border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white py-2 px-4 rounded items-center mt-1 mr-2 transition duration-300 ease-in-out"
                      >
                        カテゴリを追加
                      </button>
                    </div>
                    <div className="flex justify-center my-2">
                      <p className=" text-sm">
                        ※
                        登録したカテゴリをクリックすることで詳細ページへ遷移できます
                      </p>
                    </div>
                    <TermRegistration
                      registrationCategories={registrationCategories}
                      updateRegistrationCategories={
                        updateRegistrationCategories
                      }
                      handleShow_second={handleShow}
                    />
                  </div>
                ) : (
                  <div className="py-[10px] pr-[5px] min-[1000px]:px-[100px] min-[1200px]:w-[1080px] min-[1600px]:w-[1580px] mx-auto">
                    <TermGraph graphData={graphData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <Modal ref={ref} className="w-4/5 min-[560px]:w-3/5">
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
          {isTemplate ? (
            <TermTemplate
              categories={categories}
              closeModal={handleCloseModal}
              updateRegistrationCategories={updateRegistrationCategories}
            />
          ) : (
            <TermCustom
              closeModal={handleCloseModal}
              updateRegistrationCategories={updateRegistrationCategories}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
