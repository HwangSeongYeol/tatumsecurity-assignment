import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <main
      role="main"
      aria-labelledby="notfound-heading"
      className="flex flex-1 items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-xl text-center">
        <h1 id="notfound-heading" className="text-9xl font-extrabold tracking-tight text-blue-600">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">페이지를 찾을 수 없습니다.</p>
        <p className="mt-2 text-sm text-gray-500">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            홈으로 돌아가기
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-400">문제가 계속되면 관리자에게 문의하세요.</p>
      </div>
    </main>
  );
};

export default NotFoundPage;
