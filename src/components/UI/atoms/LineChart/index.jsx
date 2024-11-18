import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

);

import { lineChartData } from '../../../pages/Dashboard/data';

import cls from './LineChart.module.scss'
import PieChartHeader from '../PieChartHeader';
import Select from '../Form/Select';
import { MONTH_OPTIONS } from '@/constants/form';

const getCurrentMonth = () => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[new Date().getMonth()];
};

const getDaysInMonth = (month) => Array.from({ length: lineChartData[month].length }, (_, i) => i + 1);

function LineChart() {
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

    const data = {
        labels: getDaysInMonth(selectedMonth),
        datasets: [
            {
                label: `2024`,
                data: lineChartData[selectedMonth],
                fill: false,
                borderColor: 'rgba(18, 86, 219, 1)',
                pointHoverRadius: 7,
                pointRadius: 6,
                tension: 0.5,
                borderWidth: 2
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)",
                },
                title: {
                    display: false,
                    text: "Days",
                },
            },
            y: {
                min: 0,
                max: 100,
                grid: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)",
                },
                title: {
                    display: false,
                    text: "Value",
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className={cls.LineChart}>
            <div>
                <PieChartHeader title="O'quvchilar Oqimi" />
                <Select 
                    placeholder='Month'
                    isSearchable={false}
                    className={cls.select}
                    options={MONTH_OPTIONS}
                />
            </div>

            <Line data={data} options={options} />
        </div>
    );
}

export default LineChart;
