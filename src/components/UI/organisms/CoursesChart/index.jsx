import { Pie } from 'react-chartjs-2';
import ChartTitle from '../../atoms/ChartTitle';
import LegendItem from '../../atoms/LegendItem';
import cls from './CoursesChart.module.scss';
import { ArcElement, Chart } from 'chart.js';

Chart.register(ArcElement);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
        datalabels: {
            anchor: 'end',
            align: 'end',
            padding: 4,
        }
    },
    cutout: "50%",
    elements: {
        arc: {
            borderWidth: 1,
            borderRadius: 4,
        },
    },
}

const CoursesChart = ({
    title = '',
    courses = []
}) => {
    const colors = ['rgba(255, 207, 84, 0.8)', 'rgba(255, 51, 51, 0.8)', 'rgba(66, 120, 226, 0.8)']
    const studentsCount = courses?.reduce((acc, curr) => acc + +(curr?.count || 0), 0)
    const legends = courses?.map(course => ({ name: course?.title, value: ((course?.count / studentsCount) * 100).toFixed(2) }))

    const data = {
        labels: courses?.map(course => course?.title),
        datasets: [
            {
                label: "Oquvchilar soni",
                backgroundColor: colors,
                data: courses?.map(course => course?.count)
            }
        ]
    }

    return (
        <div className={cls.cart}>
            <ChartTitle>{title}</ChartTitle>
            <Pie
                className={cls.cart__chart}
                data={data}
                options={options}
            // plugins={[
            //     {
            //       id: 'customLabels',
            //       afterDraw: (chart) => {
            //         const { ctx, chartArea: { width, height } } = chart;
            //         const meta = chart.getDatasetMeta(0);
            //         const centerX = width / 2;
            //         const centerY = height / 2;

            //         meta.data.forEach((element, index) => {
            //           const { startAngle, endAngle, outerRadius } = element;
            //           const angle = (startAngle + endAngle) / 2;
            //           const labelRadius = outerRadius + 20;
            //           const xStart = centerX + outerRadius * Math.cos(angle);
            //           const yStart = centerY + outerRadius * Math.sin(angle);
            //           const xEnd = centerX + labelRadius * Math.cos(angle);
            //           const yEnd = centerY + labelRadius * Math.sin(angle);

            //           // Draw line starting from the edge of the doughnut section
            //           ctx.beginPath();
            //           ctx.moveTo(xStart, yStart);
            //           ctx.lineTo(xEnd, yEnd);
            //           ctx.strokeStyle = data.datasets[0].backgroundColor[index];
            //           ctx.stroke();

            //           // Draw text
            //           ctx.font = "bold 16px Arial";
            //           ctx.fillStyle = data.datasets[0].backgroundColor[index];
            //           ctx.textAlign = xEnd < centerX ? "right" : "left";
            //           ctx.fillText(data.datasets[0].data[index], xEnd, yEnd);
            //         });
            //       },
            //     },
            //   ]}
            />
            <div className={cls.cart__legends}>
                {legends?.length > 0 && legends.map((legend, index) => (
                    <LegendItem
                        key={index}
                        name={legend?.name}
                        value={legend?.value}
                    />
                ))}
            </div>
        </div>
    );
}

export default CoursesChart;