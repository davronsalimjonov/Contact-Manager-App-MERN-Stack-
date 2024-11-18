import { Pie } from 'react-chartjs-2';
import ChartTitle from '../../atoms/ChartTitle';
import LevelLegendItem from '../../atoms/LevelLegendItem';
import cls from './StudentsLevelChart.module.scss';

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

const StudentsLevelChart = ({
    title = '',
    levels = []
}) => {
   
    const colors = [
        { color: 'rgba(18, 86, 219, 0.8)', borderColor: 'rgba(18, 86, 219, 0.2)', backgroundColor: 'rgba(18, 86, 219, 0.1)' },
        { color: 'rgba(39, 205, 2, 0.8)', borderColor: 'rgba(214, 244, 222, 0.2)', backgroundColor: 'rgba(235, 250, 239, 1)' },
        { color: 'rgba(100, 2, 205, 0.8)', borderColor: 'rgba(100, 2, 205, 0.2)', backgroundColor: 'rgba(100, 2, 205, 0.1)' },
        { color: 'rgba(255, 51, 51, 0.8)', borderColor: 'rgba(255, 51, 51, 0.2)', backgroundColor: 'rgba(255, 51, 51, 0.1)' },
        { color: 'rgba(255, 52, 219, 0.8)', borderColor: 'rgba(255, 52, 219, 0.2)', backgroundColor: 'rgba(255, 52, 219, 0.1)' },
        { color: 'rgba(255, 210, 95, 0.8)', borderColor: 'rgba(255, 210, 95, 0.2)', backgroundColor: 'rgba(255, 210, 95, 0.8)' },
    ]

    const data = {
        labels: levels?.map(level => (level?.level)),
        datasets: [{
            data: levels?.map(level => level?.count),
            backgroundColor: colors.map(color => color.color),
            label: 'Oquvchilar soni'
        }]
    }

    const legends = levels?.map((level, index) => ({
        name: level?.level,
        count: level?.count,
        color: colors?.[index].color,
        borderColor: colors?.[index].borderColor,
        backgroundColor: colors?.[index]?.backgroundColor
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

export default StudentsLevelChart;