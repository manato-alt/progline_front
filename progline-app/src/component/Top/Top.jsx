import React from "react";
import SearchForm from "./SearchForm";
import UserList from "./UserList";

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
      <SearchForm />
      <UserList />
    </div>
  );
}
