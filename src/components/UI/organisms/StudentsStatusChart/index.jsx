import { Pie } from 'react-chartjs-2';
import ChartTitle from '../../atoms/ChartTitle';
import LevelLegendItem from '../../atoms/LevelLegendItem';
import cls from './StudentsStatusChart.module.scss';

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
    cutout: "70%",
}

const StudentsStatusChart = ({
    title = '',
    status = []
}) => {

    const colors = [
        { color: 'rgba(255, 210, 95, 0.8)', borderColor: 'rgba(255, 210, 95, 0.2)', backgroundColor: 'rgba(255, 210, 95, 0.1)' },
        { color: 'rgba(255, 52, 219, 0.8)', borderColor: 'rgba(255, 52, 219, 0.2)', backgroundColor: 'rgba(255, 52, 219, 0.1)' },
        { color: 'rgba(18, 86, 219, 0.8)', borderColor: 'rgba(18, 86, 219, 0.2)', backgroundColor: 'rgba(18, 86, 219, 0.1)' },
        { color: 'rgba(39, 205, 2, 0.8)', borderColor: 'rgba(39, 205, 2, 0.2)', backgroundColor: 'rgba(39, 205, 2, 0.1)' },
        { color: 'rgba(100, 2, 205, 0.8)', borderColor: 'rgba(100, 2, 205, 0.2)', backgroundColor: 'rgba(100, 2, 205, 0.1)' },
        { color: 'rgba(255, 51, 51, 0.8)', borderColor: 'rgba(255, 51, 51, 0.2)', backgroundColor: 'rgba(255, 51, 51, 0.1)' },
        { color: 'rgba(255, 128, 0, 0.8)', borderColor: 'rgba(255, 128, 0, 0.2)', backgroundColor: 'rgba(255, 128, 0, 0.1)' },
        { color: 'rgba(0, 255, 255, 0.8)', borderColor: 'rgba(0, 255, 255, 0.2)', backgroundColor: 'rgba(0, 255, 255, 0.1)' },
        { color: 'rgba(255, 0, 128, 0.8)', borderColor: 'rgba(255, 0, 128, 0.2)', backgroundColor: 'rgba(255, 0, 128, 0.1)' },
        { color: 'rgba(0, 128, 255, 0.8)', borderColor: 'rgba(0, 128, 255, 0.2)', backgroundColor: 'rgba(0, 128, 255, 0.1)' },
        { color: 'rgba(0, 255, 0, 0.8)', borderColor: 'rgba(0, 255, 0, 0.2)', backgroundColor: 'rgba(0, 255, 0, 0.1)' },
        { color: 'rgba(128, 0, 255, 0.8)', borderColor: 'rgba(128, 0, 255, 0.2)', backgroundColor: 'rgba(128, 0, 255, 0.1)' },
    ]

    const getLevelColor = (index) => {
        return colors[index % colors.length]
    }

    const data = {
        labels: status?.map(stat => (stat?.status)),
        datasets: [{
            data: status?.map(stat => stat?.count),
            backgroundColor: status?.map((_, index) => getLevelColor(index)?.color),
            label: 'Oquvchilar soni'
        }]
    }

    const legends = status?.map((stat, index) => ({
        name: stat?.status,
        count: stat?.count,
        color: getLevelColor(index).color,
        borderColor: getLevelColor(index).borderColor,
        backgroundColor: getLevelColor(index)?.backgroundColor
    }))

    return (
        <div className={cls.cart}>
            <ChartTitle>{title}</ChartTitle>
            <div>
                <Pie
                    data={data}
                    options={options}
                    className={cls.cart__chart}
                />
                <div className={cls.cart__legends}>
                    {legends?.length > 0 && legends.map((legend, index) => (
                        <LevelLegendItem 
                            key={index}
                            count={legend?.count}
                            level={legend?.name}
                            borderColor={legend?.borderColor}
                            backgroundColor={legend?.backgroundColor}
                            color={legend?.color}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StudentsStatusChart;