import React, { useRef, useState, useEffect, useCallback } from "react";
import myImage from "../../images/toppage-removebg.jpg";
import { Modal, Button } from "react-daisyui";
import TermTemplate from "./TermTemplate";
import TermCustom from "./TermCustom";
import axios from "axios";
import TermRegistration from "./TermRegistration";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import TermGraph from "./TermGraph";

export default function Terms() {
  const [categories, setCategories] = useState([]);
  const [registrationCategories, setRegistrationCategories] = useState([]);
  const [isTemplate, setIsTemplate] = useState(true);
  const ref = useRef(null);
  const [user] = useAuthState(auth);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3010/template_categories"
        );
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
        // userとuser.uidが存在するかを確認
        try {
          const res = await axios.get("http://localhost:3010/categories", {
            params: {
              user_id: user.uid,
            },
          });
          setRegistrationCategories(res.data);
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
  }, [user]);

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
      const res = await axios.get("http://localhost:3010/categories", {
        params: {
          user_id: user.uid,
        },
      });
      setRegistrationCategories(res.data);
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
      <div>
        <div className="my-5 p-5 ml-4  min-[1300px]:mx-32">
          <div className="flex justify-between items-center mb-3">
            <div className="font-bold">登録したカテゴリ</div>
            <div>
              <button
                onClick={handleShow}
                className="text-sm bg-gray-300  py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-gray-400"
              >
                カテゴリを追加
              </button>
            </div>
          </div>
          <div>
            <TermRegistration
              registrationCategories={registrationCategories}
              updateRegistrationCategories={updateRegistrationCategories}
            />
          </div>
        </div>
      </div>
      <div className="mx-5 min-[500px]:mx-10 sm:mx-20 mb-10">
        <TermGraph />
      </div>
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
            <TermTemplate
              categories={categories}
              closeModal={handleCloseModal}
              updateRegistrationCategories={updateRegistrationCategories}
            />
          ) : (
            /* カスタムの内容 */
            <TermCustom
              closeModal={handleCloseModal}
              updateRegistrationCategories={updateRegistrationCategories}
            />
          )}
          {/* 切り替えるボタン */}
        </Modal.Body>
      </Modal>
    </div>
  );
}
