import { Pie } from 'react-chartjs-2';
import ChartTitle from '../../atoms/ChartTitle';
import LevelLegendItem from '../../atoms/LevelLegendItem';
import cls from './StudentsCountChart.module.scss';

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
        datalabels: {
            display: false,
            anchor: 'end',
            align: 'end',
            padding: 4,
        }
    },
    cutout: "60%",
}

const StudentsCountChart = ({
    title = '',
    items = []
}) => {
    const data = {
        labels: items?.map(item => (item?.label)),
        datasets: [{
            data: items?.map(item => item?.value),
            backgroundColor: items?.map((item) => item?.color),
            label: 'Oquvchilar soni'
        }]
    }

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
                    {items?.length > 0 && items.map((item, index) => (
                        <LevelLegendItem 
                            key={index}
                            count={item?.value}
                            level={item?.label}
                            borderColor={item?.borderColor}
                            backgroundColor={item?.backgroundColor}
                            color={item?.color}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StudentsCountChart;