import { Bar } from 'react-chartjs-2';
import cls from './CourseSalesBarChart.module.scss';
import { Chart as ChartJS, BarElement } from 'chart.js';

ChartJS.register(BarElement);

const CourseSalesBarChart = () => {
    // Generate sample data (1-31 days)
    const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const data = {
        labels,
        datasets: [
            {
                data: [950, 580, 680, 780, 450, 400, 580, 680, 400, 900, 450, 820, 380, 650, 900, 500, 850, 320, 680, 210, 740, 780, 580, 440, 820, 650, 550, 780, 580, 850, 580],
                backgroundColor: 'rgba(66, 120, 226, 1)',
                borderRadius: 0,
                label: 'Oquvchi soni'
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            datalabels: {
        display: false
      }

        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: 'rgba(95, 108, 134, 1)',
                    font: { size: 12 },
                },
            },
            y: {
                border: {
                    display: false,
                },
                grid: {
                    color: 'rgb(243, 244, 246)',
                },
                ticks: {
                    color: 'rgba(95, 108, 134, 1)',
                    font: { size: 12 },
                    maxTicksLimit: 5,
                },
            },
        },
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