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

import { lineChartData } from '../../organisms/Main/data';

import cls from './LineChart.module.scss'
import PieChartHeader from '../PieChartHeader';

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
                label: `${selectedMonth} Data`,
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
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: 'Days',
                },
            },
            y: {
                title: {
                    display: false,
                    text: 'Values',
                },
            },
        },
    };

    return (
        <div className={cls.LineChart}>
            <div>
                <PieChartHeader title="O'quvchilar Oqimi" />
                <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
                    {Object.keys(lineChartData).map((month) => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            <Line data={data} options={options} />
        </div>
    );
}

export default LineChart;
