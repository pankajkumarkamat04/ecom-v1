import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const SalesChart = ({ salesData }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = salesData?.map((data) => data?.date);

  const data = {
    labels,
    datasets: [
      {
        label: "Order",
        data: salesData?.map((data) => data?.orders),
        borderColor: "red",
        backgroundColor: "#FFCCCB",
        yAxisID: "y",
      },
      {
        label: "Sales",
        data: salesData?.map((data) => data?.sales),
        borderColor: "green",
        backgroundColor: "#90EE90",
        yAxisID: "y1",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default SalesChart;
