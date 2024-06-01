import React, { useEffect, useState, useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { axiosInstance } from "../../utils/axios";

const ShareTermProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { shareCode } = useParams();

  const fetchAuthorization = useCallback(async () => {
    if (shareCode) {
      try {
        const response = await axiosInstance.post(
          `/shared_codes/validate_access_term`,
          {
            code: shareCode,
          }
        );
        setIsAuthorized(response.data.access);
      } catch (error) {
        console.error("Error fetching authorization:", error);
        setIsAuthorized(false);
      }
    }
  }, [shareCode]);

  useEffect(() => {
    if (shareCode) {
      fetchAuthorization();
    }
  }, [shareCode, fetchAuthorization]);

  if (isAuthorized === null) {
    return (
      <div>
        <Loading />
      </div>
    ); // 認証情報やAPIレスポンスを取得中に表示するローディング画面
  }

  return isAuthorized ? <Component {...rest} /> : <Navigate to="*" />;
};

export default ShareTermProtectedRoute;
