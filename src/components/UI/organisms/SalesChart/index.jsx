import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Filler } from "chart.js";
import Tabs from '../../moleculs/Tabs';
import cls from './SalesChart.module.scss';

ChartJS.register(Filler);

const SalesChart = ({
    data = [],
    defaultSeason = 'daily',
    onChangeTabs
}) => {
    const getGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(0, 133, 255, 0.2)");
        gradient.addColorStop(1, "rgba(0, 133, 255, 0)");
        return gradient;
    };

    const dataOptions = {
        labels: data?.map((item) => item?.label),
        datasets: [
            {
                label: "Sotuv summasi",
                data: data?.map((item) => item?.sum),
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
                pointRadius: 1,
                borderWidth: 2,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: false
        },
        scales: {
            x: {
                grid: {
                    drawBorder: false,
                    display: false,
                },
                ticks: {
                    color: "rgba(115, 115, 115, 1)",
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
                    color: "rgba(115, 115, 115, 1)",
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
                    defaultValue={defaultSeason}
                    onChange={onChangeTabs}
                    options={[
                        { label: 'Kunlik', value: 'daily' },
                        { label: 'Oylik', value: 'monthly' },
                        { label: 'Yillik', value: 'yearly' },
                    ]}
                />
            </div>
            <Line data={dataOptions} height={50} options={options} />
        </div>
    );
}

export default SalesChart;