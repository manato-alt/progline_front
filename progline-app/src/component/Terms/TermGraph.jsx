import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TermGraph({ graphData }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Chart.jsインスタンスを格納するためのref

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
              x: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1, // 1単位ごとにする設定
                },
              },
            },
          },
        });
        chartRef.current.style.height = `${55 * graphData.length + 75}px`;
      }
    }
  }, [graphData]);

  return (
    <>
      <canvas id="myChart" width={500} ref={chartRef} />
    </>
  );
}
