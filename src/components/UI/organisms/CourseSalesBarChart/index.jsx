import { Bar } from 'react-chartjs-2';
import cls from './CourseSalesBarChart.module.scss';
import { Chart as ChartJS, BarElement } from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(BarElement);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        datalabels: { display: false }
    },
    scales: {
        x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
                color: 'rgba(95, 108, 134, 1)',
                font: { size: 12 },
            },
        },
        y: {
            border: { display: false },
            grid: { color: 'rgb(243, 244, 246)' },
            ticks: {
                color: 'rgba(95, 108, 134, 1)',
                font: { size: 12 },
                maxTicksLimit: 5,
            },
        },
    },
};

const fillMissingMonthDates = (data = [], month, year) => {
    const formattedMonth = String(month).padStart(2, "0");
    const daysInMonth = dayjs(`${year}-${formattedMonth}-01`).daysInMonth();

    const filledData = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const existing = data.find(item => dayjs(item.date).date() === day);

        return {
            date: day,
            count: existing ? Number(existing.count) : null,
        };
    });

    return filledData;
};

const CourseSalesBarChart = ({
    items = [],
    startDate
}) => {
    const filledData = fillMissingMonthDates(items, new Date(startDate).getMonth() + 1, new Date(startDate).getFullYear());

    const data = {
        labels: filledData?.map(student => student?.date),
        datasets: [
            {
                data: filledData?.map(student => student?.count),
                backgroundColor: 'rgba(66, 120, 226, 1)',
                borderRadius: 0,
                label: 'Oquvchi soni'
            },
        ],
    };

    return (
        <div className={cls.chart}>
            <h3 className={cls.chart__title}>Kurs sotib olgan o’quvchilar bo’yicha</h3>
            <div>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default CourseSalesBarChart;