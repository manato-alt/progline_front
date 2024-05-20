import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Chart from "chart.js/auto";

export default function TermGraph() {
  const [graphData, setGraphData] = useState(null);
  const [user] = useAuthState(auth);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Chart.jsインスタンスを格納するためのref
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.uid) {
          const res = await axios.get("http://localhost:3010/graphs", {
            params: {
              user_id: user.uid,
            },
          });
          setGraphData(res.data);
        }
      } catch (error) {
        console.error("グラフデータの取得エラー:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setErrorMessages(error.response.data.errors.join(", "));
        } else {
          setErrorMessages("登録中にエラーが発生しました");
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (graphData && graphData.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // 前のChartインスタンスを破棄する
      }
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: graphData.map((data) => data.label),
            datasets: [
              {
                label: "コンテンツ数",
                data: graphData.map((data) => data.data),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            indexAxis: "y", // y軸を使用することを明示
            scales: {
              y: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          },
        });
      }
    }
  }, [graphData]);

  return (
    <>
      {errorMessages !== null &&
        // errorMessages が文字列か配列かで処理を分岐
        (typeof errorMessages === "string" ? (
          <p className="text-red-500 mb-4">{errorMessages}</p>
        ) : (
          errorMessages.map((message, index) => (
            <p key={index} className="text-red-500 mb-4">
              {message}
            </p>
          ))
        ))}{" "}
      <canvas id="myChart" width={500} height={800} ref={chartRef} />
    </>
  );
}
