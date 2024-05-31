import React, { useRef, useCallback } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaShareNodes } from "react-icons/fa6";
import { GoTriangleDown } from "react-icons/go";
import { Dropdown, Modal, Button } from "react-daisyui";
import { PiSignOutBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import ShareModal from "./Share/ShareModal";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Header() {
  const [user] = useAuthState(auth);
  const ref = useRef(null);

  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  return (
    <header className="bg-white py-2 fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-32 min-[500px]:w-40 min-[700px]:w-56 mx-6"
          />
        </Link>
        <div className="text-white text-lg">
          {user ? (
            <div className="flex items-center">
              <Link to="/terms">
                <button className="hidden sm:flex border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white py-1 px-4 rounded items-center mt-1 mr-2 transition duration-300 ease-in-out">
                  <FaChalkboardTeacher className="mr-1" />
                  <p>記録ボード</p>
                </button>
              </Link>

              <button
                className="hidden sm:flex border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white py-1 px-4 rounded items-center mt-1 mr-2 transition duration-300 ease-in-out"
                onClick={handleShow}
              >
                <FaShareNodes className="mr-1" />
                <p>共有</p>
              </button>

              <Dropdown className="z-40">
                <Dropdown.Toggle className="mr-6">
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
                  <Dropdown.Item
                    className="flex items-center text-black sm:hidden"
                    href="/terms"
                  >
                    <FaChalkboardTeacher className="mr-2" />
                    <p>記録ボード</p>
                  </Dropdown.Item>
                  <div className="border my-2 sm:hidden"></div>
                  <Dropdown.Item className="sm:hidden">
                    <button
                      className="flex items-center text-black"
                      onClick={handleShow}
                    >
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
      <Modal ref={ref} className="p-0">
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
        <Modal.Header className="p-0 m-0"></Modal.Header>
        <Modal.Body>
          <ShareModal />
        </Modal.Body>
      </Modal>
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
      className="flex items-center py-1 px-4 min-[500px]:py-2 bg-black min-[700px]:py-3 min-[500px]:px-6 rounded-lg mr-4 min-[500px]:mr-6 text-white"
    >
      <FcGoogle />
      <p className="text-base ml-1">Googleでログイン</p>
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
