import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // 認証情報を取得中に表示するローディング画面
  }

  return user ? <Component {...rest} /> : <Navigate to="*" />;
};

export default ProtectedRoute;
