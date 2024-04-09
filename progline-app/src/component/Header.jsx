import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export default function Header() {
  const [user] = useAuthState(auth);
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Progline</h1>
        <p className="text-white text-lg">
          {user ? (
            <>
              <UserInfo />
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </p>
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

  return <button onClick={signInWithGoogle}>Googleでサインイン</button>;
}

//サインアウト
function SignOutButton() {
  return (
    <button onClick={() => auth.signOut()}>
      <p>サインアウト</p>
    </button>
  );
}

function UserInfo() {
  return (
    <div>
      <img src={auth.currentUser.photoURL} alt="" />
      <p>{auth.currentUser.displayName}</p>
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
