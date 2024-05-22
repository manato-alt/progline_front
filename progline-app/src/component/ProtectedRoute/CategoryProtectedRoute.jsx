import React, { useEffect, useState, useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../contexts/AuthContext";
import axios from "axios";

const CategoryProtectedRoute = ({ element: Component, ...rest }) => {
  const [user, loading] = useAuthState(auth);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { categoryId } = useParams();

  const fetchAuthorization = useCallback(async () => {
    if (user) {
      try {
        const response = await axios.post(
          `http://localhost:3010/categories/validate_access`,
          {
            category_id: categoryId,
            user_id: user.uid,
          }
        );
        setIsAuthorized(response.data.access);
      } catch (error) {
        console.error("Error fetching authorization:", error);
        setIsAuthorized(false);
      }
    }
  }, [user, categoryId]);

  useEffect(() => {
    if (!loading && user) {
      fetchAuthorization();
    }
  }, [user, loading, categoryId, fetchAuthorization]);

  if (loading || isAuthorized === null) {
    return <div>Loading...</div>; // 認証情報やAPIレスポンスを取得中に表示するローディング画面
  }

  return user && isAuthorized ? <Component {...rest} /> : <Navigate to="*" />;
};

export default CategoryProtectedRoute;
