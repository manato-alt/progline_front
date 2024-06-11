import React, { useRef, useState, useCallback, useEffect } from "react";
import { Modal, Button } from "react-daisyui";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import TermEdit from "./TermEdit";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";

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
  const [editingCategory, setEditingCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleDelete = async (categoryId) => {
    try {
      await axiosInstance.delete(`/categories/${categoryId}`);
      console.log("カテゴリーが削除されました");
      updateRegistrationCategories();
      setErrorMessages([]);
    } catch (error) {
      console.error("カテゴリーの削除中にエラーが発生しました:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessages([error.response.data.error]);
      } else {
        setErrorMessages(["カテゴリーの削除中にエラーが発生しました"]);
      }
    }
  };

  const handleShow = useCallback((category) => {
    setEditingCategory(category);
    setDropdownOpen(null);
  }, []);

  useEffect(() => {
    if (editingCategory) {
      ref.current?.showModal();
    }
  }, [editingCategory]);

  const handleCloseModal = () => {
    ref.current?.close();
    setEditingCategory(null);
  };

  const toggleDropdown = (categoryId) => {
    if (dropdownOpen === categoryId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(categoryId);
    }
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (dropdownOpen && !event.target.closest(`#dropdown-${dropdownOpen}`)) {
        setDropdownOpen(null);
      }
    },
    [dropdownOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {errorMessages &&
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
          <div key={generateUUID()} className="w-full mb-4">
            <Link to={`/termsDetail/${registrationCategory.id}`}>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 border bg-white border-cyan-500 rounded-full flex justify-center items-center">
                  {registrationCategory.image.url ||
                  registrationCategory.original_url ? (
                    <img
                      src={
                        registrationCategory.image.url ||
                        registrationCategory.original_url
                      }
                      alt="Category"
                      className="object-cover w-16 h-16 rounded"
                    />
                  ) : null}
                </div>
                <p className="text-sm md:text-base text-center mt-1 overflow-hidden">
                  {registrationCategory.name}
                </p>
              </div>
            </Link>
            <div
              className="relative flex justify-center"
              id={`dropdown-${registrationCategory.id}`}
            >
              <button
                className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none bg-white py-1 px-2 rounded-lg shadow-md border border-gray-300"
                onClick={() => toggleDropdown(registrationCategory.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span className="text-sm md:text-base">メニュー</span>
              </button>
              {dropdownOpen === registrationCategory.id && (
                <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg py-2 z-10">
                  <button
                    onClick={() => handleShow(registrationCategory)}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    <CiEdit className="mr-1" />
                    編集
                  </button>
                  <div className="border m-1"></div>
                  <button
                    onClick={() => handleDelete(registrationCategory.id)}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    <RiDeleteBinLine className="mr-1" />
                    削除
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="hidden min-[700px]:block ml-[90px] mt-6">
          <button
            onClick={handleShow_second}
            className="bg-gray-200 rounded-full w-12 h-12 flex flex-col justify-center items-center hover:bg-gray-300"
          >
            <div className="text-3xl md:text-4xl">+</div>
          </button>
        </div>
      </div>
      <Modal ref={ref}>
        <form method="dialog">
          <Button
            size="sm"
            color="ghost"
            shape="circle"
            className="absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            x
          </Button>
        </form>
        <Modal.Header className="font-bold">カテゴリー編集</Modal.Header>
        <Modal.Body>
          <TermEdit
            closeModal={handleCloseModal}
            updateRegistrationCategories={updateRegistrationCategories}
            category={editingCategory}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
