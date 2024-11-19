import { Pie } from 'react-chartjs-2';
import ChartTitle from '../../atoms/ChartTitle';
import LegendItem from '../../atoms/LegendItem';
import cls from './CoursesChart.module.scss';

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
    
    const getCourseColor = (index) => {
        return colors[index % colors.length]
    }
    
    const data = {
        labels: courses?.map(course => course?.title),
        datasets: [
            {
                label: "Oquvchilar soni",
                backgroundColor: courses?.map((_, index) => getCourseColor(index)),
                data: courses?.map(course => course?.count)
            }
        ]
    }

    const legends = courses?.map((course, index) => ({ 
        name: course?.title, 
        value: ((course?.count / studentsCount) * 100).toFixed(2),
        color: getCourseColor(index) 
    }))

    return (
        <div className={cls.cart}>
            <ChartTitle>{title}</ChartTitle>
            <Pie
                className={cls.cart__chart}
                data={data}
                options={options}
            />
            <div className={cls.cart__legends}>
                {legends?.length > 0 && legends.map((legend, index) => (
                    <LegendItem
                        key={index}
                        name={legend?.name}
                        value={`${legend?.value || 0}%`}
                        color={legend?.color}
                    />
                ))}
            </div>
        </div>
    );
}

export default CoursesChart;