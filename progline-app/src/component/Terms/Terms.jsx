import React, { useRef, useState, useEffect, useCallback } from "react";
import myImage from "../../images/toppage-removebg.jpg";
import { Modal, Button } from "react-daisyui";
import TermTemplate from "./TermTemplate";
import TermCustom from "./TermCustom";
import axios from "axios";

export default function Terms() {
  const [categories, setCategories] = useState([]);
  const [isTemplate, setIsTemplate] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3010/categories");
        setCategories(res.data);
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

  return (
    <div>
      <div className="bg-[#f8f9fb] flex justify-center items-center  pt-5 pl-5 pr-32">
        <img
          src={myImage}
          alt="イラスト画像"
          className="object-contain w-1/3"
        />
        <p className="text-3xl text-sky-500 font-bold">
          技術の道しるべ、
          <br />
          IT特化の学習メモリアル
        </p>
      </div>
      <div>
        <div className="border flex justify-between p-5  my-5 mx-32">
          <div>登録したカテゴリ</div>
          <div>
            <button
              onClick={handleShow}
              className="bg-gray-300 py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-gray-400"
            >
              カテゴリを追加
            </button>
          </div>
        </div>
      </div>
      <div>グラフを表示</div>
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
            />
          ) : (
            /* カスタムの内容 */
            <TermCustom />
          )}
          {/* 切り替えるボタン */}
        </Modal.Body>
      </Modal>
    </div>
  );
}
