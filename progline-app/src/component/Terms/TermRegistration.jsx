import React from "react";
import { Dropdown } from "react-daisyui";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function TermRegistration({
  registrationCategories,
  updateRegistrationCategories,
}) {
  const [user] = useAuthState(auth);
  const generateUUID = () => {
    return uuidv4();
  };

  const handleDelete = async (userId, categoryId) => {
    try {
      // カテゴリーを削除するリクエストを送信
      await axios.delete(
        `http://localhost:3010/categories/${userId}/${categoryId}`
      );
      console.log("カテゴリーが削除されました");
      updateRegistrationCategories();
      // 成功した場合の処理をここに記述
    } catch (error) {
      console.error("カテゴリーの削除中にエラーが発生しました:", error);
      // エラー時の処理をここに記述
    }
  };

  return (
    <div>
      <div className="grid grid-cols-9 gap-4">
        {registrationCategories.map((registrationCategory) => (
          <div
            key={generateUUID()}
            className="bg-slate-100 rounded-md p-4 cursor-pointer hover:bg-blue-200  w-28 h-28 flex flex-col justify-center relative"
          >
            <div className="w-10 h-10 mx-auto">
              <img
                src={registrationCategory.image_url}
                alt={registrationCategory.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm text-center mt-2">
              {registrationCategory.name}
            </p>
            <div className="absolute right-3 top-3 font-bold">︙</div>

            {/* ドロップダウンメニュー */}
            <Dropdown className="absolute right-0 top-0">
              <Dropdown.Toggle className="opacity-0 hover:opacity-50"></Dropdown.Toggle>
              <Dropdown.Menu className="w-40 right-0 border z-50">
                <Dropdown.Item>
                  <CiEdit className="mr-1" />
                  編集
                </Dropdown.Item>
                <div className="border my-2"></div>
                <Dropdown.Item
                  onClick={() =>
                    handleDelete(user.uid, registrationCategory.id)
                  }
                >
                  <RiDeleteBinLine className="mr-1" />
                  削除
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ))}
      </div>
    </div>
  );
}