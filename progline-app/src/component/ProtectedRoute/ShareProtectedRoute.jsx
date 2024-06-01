import React, { useEffect, useState, useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { axiosInstance } from "../../utils/axios";

const ShareProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { shareCode, categoryId } = useParams();

  const fetchAuthorization = useCallback(async () => {
    if ((shareCode, categoryId)) {
      try {
        const response = await axiosInstance.post(
          `/shared_codes/validate_access`,
          {
            category_id: categoryId,
            code: shareCode,
          }
        );
        setIsAuthorized(response.data.access);
      } catch (error) {
        console.error("Error fetching authorization:", error);
        setIsAuthorized(false);
      }
    }
  }, [shareCode, categoryId]);

  useEffect(() => {
    if (shareCode && categoryId) {
      fetchAuthorization();
    }
  }, [shareCode, categoryId, fetchAuthorization]);

  if (isAuthorized === null) {
    return (
      <div>
        <Loading />
      </div>
    ); // 認証情報やAPIレスポンスを取得中に表示するローディング画面
  }

  return isAuthorized ? <Component {...rest} /> : <Navigate to="*" />;
};

export default ShareProtectedRoute;
