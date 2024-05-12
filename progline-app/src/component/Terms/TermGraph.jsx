import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function TermGraph() {
  const [graphData, setGraphData] = useState(null);
  const [user] = useAuthState(auth);
  const chartRef = useRef(null);

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

  const data = useMemo(
    () => ({
      labels: graphData ? graphData.map((data) => data.label) : [],
      datasets: [
        {
          label: "コンテンツ数",
          data: graphData ? graphData.map((data) => data.data) : [],
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
    }),
    [graphData]
  );

  const options = useMemo(
    () => ({
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
          },
        },
        x: {
          ticks: {
            stepSize: 1,
          },
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (graphData && graphData.length > 0) {
      if (chartRef && chartRef.current) {
        chartRef.current.destroy();
      }
      const ctx = document.getElementById("myChart")?.getContext("2d");
      if (ctx) {
        chartRef.current = new Chart(ctx, {
          type: "bar",
          data: data,
          options: options,
        });
      }
    }
  }, [graphData, data, options]);

  return (
    <Bar
      id="myChart"
      data={data}
      options={options}
      width={500}
      height={800}
      ref={chartRef}
    />
  );
}
