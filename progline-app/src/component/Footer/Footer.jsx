import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <Link to="/rule" className="hover:underline">
            利用規約
          </Link>
          <Link to="/privacy#info" className="hover:underline">
            プライバシーポリシー
          </Link>
          <a
            href="https://forms.gle/UsXg6t9p8auU4qfY7"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            お問い合わせ
          </a>
        </div>
        <div className="text-sm mt-4 lg:mt-0">Copyright © 2024. PROGLINE</div>
      </div>
    </footer>
  );
}
