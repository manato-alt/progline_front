import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaShareNodes } from "react-icons/fa6";
import { GoTriangleDown } from "react-icons/go";
import { Dropdown } from "react-daisyui";
import { PiSignOutBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function Header() {
  const [user] = useAuthState(auth);
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl ml-4 font-bold lg:text-2xl">
          Progline
        </h1>
        <div className="text-white text-lg">
          {user ? (
            <div className="flex items-center">
              <button className="hidden sm:flex text-white bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded items-center mt-1 mr-2">
                <FaShareNodes className="mr-1" />
                <p>共有</p>
              </button>

              <Dropdown>
                <Dropdown.Toggle className="mr-2">
                  <UserInfo />
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-[200px] absolute right-0 mt-1 border">
                  <div className="flex items-center p-2">
                    <img
                      src={auth.currentUser.photoURL}
                      alt=""
                      className="rounded-full w-8 h-8 mr-3"
                    />
                    <p className="text-sm text-black">
                      {auth.currentUser.displayName}
                    </p>
                  </div>
                  <div className="border my-2 sm:hidden"></div>
                  <Dropdown.Item className="sm:hidden">
                    <button className="flex items-center text-black">
                      <FaShareNodes className="mr-2" />
                      <p>共有</p>
                    </button>
                  </Dropdown.Item>
                  <div className="border my-2"></div>
                  <Dropdown.Item>
                    <SignOutButton />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // resultからユーザー情報を取得
    addUserToDatabase(user.uid);
    //firebaceを使ってGoogleでサインインする
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center bg-white p-2 rounded-lg hover:bg-gray-200"
    >
      <FcGoogle />
      <p className="text-black text-sm ml-1">Login with Google</p>
    </button>
  );
}

//サインアウト
function SignOutButton() {
  return (
    <button
      className="flex items-center text-black"
      onClick={() => auth.signOut()}
    >
      <PiSignOutBold className="mr-1" />
      <p>ログアウト</p>
    </button>
  );
}

function UserInfo() {
  return (
    <div className="flex items-center">
      <p>{auth.currentUser.displayName}</p>
      <GoTriangleDown />
    </div>
  );
}

async function addUserToDatabase(uid) {
  try {
    // RailsのAPIエンドポイントにUIDを送信
    await axios.post("http://localhost:3010/users", { uid });
    console.log("UIDがRailsのAPIに送信されました");
  } catch (error) {
    console.error("RailsのAPIへのリクエスト中にエラーが発生しました:", error);
  }
}
