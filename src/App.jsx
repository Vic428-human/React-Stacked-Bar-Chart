import { useState, useEffect } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
// https://react-chartjs-2.js.org/examples/vertical-bar-chart
import { Bar } from "react-chartjs-2";
import "./App.css";
// <ForwardRef(ChartComponent)> 組件中發生錯誤。
// 考慮在組件樹中添加錯誤邊界，以自訂錯誤處理行為。
// 訪問 https://react.dev/link/error-boundaries 了解更多關於錯誤邊界的信息。
// 下方必須註冊才能消除這個錯誤
ChartJS.register(
  // https://stackoverflow.com/questions/65002923/chart-js-where-do-i-find-which-components-should-be-registered
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function App() {
  const options = {
    plugins: {
      title: { display: true, text: "圖表標題" },
      legend: { position: "bottom" },
    },
    responsive: true,
    interaction: { mode: "index", intersect: false },
    scales: { x: { stacked: true }, y: { stacked: true } },
  };
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      // 模擬 API 回傳假資料
      const mockData = {
        OK: [
          {
            data: [
              { date: "2024-08", Cash: 30, Mogate: 100 },
              { date: "2024-09", Cash: 25, Mogate: 110 },
              { date: "2024-10", Cash: 40, Mogate: 120 },
              { date: "2024-11", Cash: 50, Mogate: 130 },
              { date: "2024-12", Cash: 60, Mogate: 140 },
              { date: "2025-01", Cash: 54, Mogate: 70 },
            ],
          },
        ],
      };

      // 模擬非同步延遲
      await new Promise((resolve) => setTimeout(resolve, 500));

      setChartData({
        labels: mockData.OK[0].data.map((item) => item.date),
        datasets: [
          {
            label: "London",
            data: mockData.OK[0].data.map((item) => item.Cash),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
          {
            label: "Berlin",
            data: mockData.OK[0].data.map((item) => item.Mogate),
            // 改成綠色
            backgroundColor: "rgba(0, 255, 0, 0.5)",
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <div className="chart">
          {chartData && chartData?.datasets && (
            <Bar data={chartData} options={options} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
