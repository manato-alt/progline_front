import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; // registerables を追加

export default function TermGraph() {
  const [graphData, setGraphData] = useState(null);
  const [user] = useAuthState(auth);

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
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    Chart.register(...registerables); // registerables を使用して全ての要素を登録

    return () => {
      Chart.unregister(...registerables); // 登録解除
    };
  }, []);

  const formatDataForChart = () => {
    if (!graphData) return { labels: [], datasets: [] };

    return {
      labels: graphData.map((data) => data.label),
      datasets: [
        {
          label: "コンテンツ数",
          data: graphData.map((data) => data.data),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  };

  return (
    <div className="w-3/4 mx-auto my-20">
      {" "}
      {/* グラフの幅を調整 */}
      {graphData && (
        <Bar
          height={70}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "カテゴリー別コンテンツ数",
              },
            },
            scales: {
              x: {
                ticks: {
                  stepSize: 1, // 目盛りの間隔
                },
              },
            },
            indexAxis: "y", // 棒グラフの向きをy軸方向に設定
            elements: {
              bar: {
                borderWidth: 1, // 棒の枠線の幅を設定
                borderRadius: 10, // 棒の角の丸みを設定
              },
            },
          }}
          data={formatDataForChart()}
        />
      )}
    </div>
  );
}
