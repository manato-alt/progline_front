import React, { useRef, useState, useCallback } from "react";
import { Dropdown, Modal, Button } from "react-daisyui";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import TermEdit from "./TermEdit";
import { Link } from "react-router-dom";

export default function TermRegistration({
  registrationCategories,
  updateRegistrationCategories,
  handleShow_second,
}) {
  const generateUUID = () => {
    return uuidv4();
  };
  const ref = useRef(null);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleDelete = async (categoryId) => {
    try {
      // カテゴリーを削除するリクエストを送信
      await axios.delete(`http://localhost:3010/categories/${categoryId}`);
      console.log("カテゴリーが削除されました");
      updateRegistrationCategories();
      setErrorMessages([]); // エラーメッセージをクリア
    } catch (error) {
      console.error("カテゴリーの削除中にエラーが発生しました:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessages([error.response.data.error]);
      } else {
        setErrorMessages(["カテゴリーの削除中にエラーが発生しました"]);
      }
    }
  };

  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const handleCloseModal = () => {
    ref.current?.close();
  };
  return (
    <div>
      <div className="grid grid-cols-2 min-[300px]:grid-cols-3 min-[400px]:grid-cols-4 min-[500px]:grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-8 2xl:grid-cols-10">
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
        {registrationCategories.map((registrationCategory) => (
          <div key={generateUUID()} className="relative w-20 md:w-28 mr-2 mt-2">
            <Link
              to={`/termsDetail/${registrationCategory.id}`}
              className="bg-white rounded-md p-4 cursor-pointer hover:bg-blue-200  w-20 h-20 md:w-28 md:h-28 flex flex-col justify-center"
            >
              <div>
                <div className="w-6 h-6 md:w-10 md:h-10 mx-auto">
                  <img
                    src={registrationCategory.image_url}
                    alt={registrationCategory.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-xs md:text-sm text-center mt-2 overflow-hidden">
                  {registrationCategory.name}
                </p>
              </div>
            </Link>
            <div className="absolute top-3 right-3  font-bold">︙</div>
            {/* ドロップダウンメニュー */}
            <Dropdown className="absolute right-0 top-0">
              <Dropdown.Toggle className="opacity-0 hover:opacity-50"></Dropdown.Toggle>
              <Dropdown.Menu className="w-28 sm:w-40 right-0 border z-50">
                <>
                  <Dropdown.Item onClick={handleShow}>
                    <CiEdit className="mr-1" />
                    編集
                  </Dropdown.Item>
                  <div className="border my-2"></div>
                </>
                <Dropdown.Item
                  onClick={() => handleDelete(registrationCategory.id)}
                >
                  <RiDeleteBinLine className="mr-1" />
                  削除
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Modal ref={ref}>
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
              <Modal.Header className="font-bold">カテゴリー編集</Modal.Header>
              <Modal.Body>
                <TermEdit
                  closeModal={handleCloseModal}
                  updateRegistrationCategories={updateRegistrationCategories}
                  category={registrationCategory}
                />
              </Modal.Body>
            </Modal>
          </div>
        ))}
        <div className="hidden min-[768px]:block ml-8 mt-10">
          <button
            onClick={handleShow_second}
            className="bg-gray-200 rounded-full p-4 w-12 h-12 flex flex-col justify-center items-center hover:bg-gray-300"
          >
            <div className="text-3xl md:text-4xl">+</div>
          </button>
        </div>
      </div>
    </div>
  );
}
