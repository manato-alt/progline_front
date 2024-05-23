import React, { useEffect, useState, useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

const ShareTermProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { shareCode } = useParams();

  const fetchAuthorization = useCallback(async () => {
    if (shareCode) {
      try {
        const response = await axios.post(
          `http://localhost:3010/shared_codes/validate_access_term`,
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
