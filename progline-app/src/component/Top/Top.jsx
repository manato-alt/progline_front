import React from "react";
import SearchForm from "./SearchForm";
import UserList from "./UserList";
import myImage from "../../images/iStock-1201580867.jpg";

export default function Top() {
  return (
    <div class="py-12">
      <div class="flex justify-center items-center">
        <div class="text-center">
          <h1 class="text-5xl font-bold tracking-wider">
            ITに特化した学習記録・共有サービス
          </h1>
          <p class="text-3xl mt-3">
            学習の記録・可視化・共有を行うことができます。
          </p>
        </div>
      </div>
      <div>
        <SearchForm />
        <UserList />
      </div>
      <div class="mt-5">
        <button class="bg-black text-white py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-gray-700">
          ログインして始める
        </button>
      </div>
      <div class="w-1/2 mx-auto">
        <img src={myImage} alt="イラスト画像" class="object-contain" />
      </div>
    </div>
  );
}
