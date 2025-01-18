import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useGetStatistic from "@/hooks/useGetStatistic";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [period] = useOutletContext()
  const { paidStudentsCount: {data: paidStudentsCount, isLoading: isLoadingPaidStudentsCount} } = useGetStatistic({ startDate: period.startDate, endDate: period.endDate })

  const chartData = paidStudentsCount?.map(item => item.count) || []
  const chartLabel = paidStudentsCount?.map(item => dayjs(item?.date).format('DD')) || []

  const data = {
    labels: chartLabel,
    datasets: [
      {
        data: chartData,
        backgroundColor: "#4278E2", 
        borderColor: "#4278E2",
        borderWidth: 1,
        barThickness: 20,
        borderRadius: 4
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
        text: "Monthly Sales",
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
          color: "#888", 
        },
      },
    },
  };

  return (
    <div style={{
        backgroundColor: "#fff",
        marginTop: "20px",
        borderRadius: "12px",
        padding: "20px"
    }}>
        <h2 style={{
            margin: "10px 0"
        }}>Kurs Sotib Olgan O'quvchilar Bo'yicha</h2>
        <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
