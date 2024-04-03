import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Progline</h1>
        <p className="text-white text-lg">ログイン</p>
      </div>
    </header>
  );
}
