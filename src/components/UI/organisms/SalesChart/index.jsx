import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Filler } from "chart.js";
import Tabs from '../../moleculs/Tabs';
import cls from './SalesChart.module.scss';

ChartJS.register(Filler);

const SalesChart = () => {
    const getGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(0, 133, 255, 0.2)");
        gradient.addColorStop(1, "rgba(0, 133, 255, 0)");
        return gradient;
    };

    const data = {
        labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [
            {
                label: "Sotuvlar soni",
                data: [0, 950, 200, 430, 1100, 600],
                fill: true,
                backgroundColor: (context) => {
                    const { chart } = context;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return "rgba(66, 165, 245, 0.2)";
                    }

                    return getGradient(ctx, chartArea);
                },
                borderColor: "rgba(18, 86, 219, 1)",
                pointRadius: 0,
                borderWidth: 2,
                tension: 0.03,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    drawBorder: false,
                    display: false,
                },
                ticks: {
                    color: "#000",
                },
                border: { display: false },
            },
            y: {
                grid: {
                    drawBorder: false,
                    drawTicks: false,
                    color: "rgb(236, 236, 236)",
                },
                border: { dash: [15, 15], display: false },
                ticks: {
                    color: "#000",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={cls.wrapper}>
            <div className={cls.wrapper__header}>
                <span className={cls.wrapper__header__title}>Oyma-oy ko’rsatkichlar</span>
                <Tabs
                    className={cls.wrapper__header__tabs}
                    activeTabClassName={cls.wrapper__header__tabs__active}
                    options={[
                        { label: 'Kunlik', value: 'day' },
                        { label: 'Oylik', value: 'month' },
                        { label: 'Yillik', value: 'year' },
                    ]}
                />
            </div>
            <Line data={data} height={50} options={options} />
        </div>
    );
}

export default SalesChart;