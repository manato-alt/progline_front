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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3010/template_categories"
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
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
    }
  };

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
      <div>
        <div className="my-5 p-5 ml-4">
          <div className="flex justify-between items-center mb-3">
            <div className="font-bold">登録したカテゴリ</div>
            <div>
              <button
                onClick={handleShow}
                className="text-xs bg-gray-300  py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-gray-400"
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
