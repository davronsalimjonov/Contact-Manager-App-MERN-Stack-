import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, LineElement, PointElement } from 'chart.js';
import { MONTH_OPTIONS } from '@/constants/form';
import Select from '../../atoms/Form/Select';
import cls from './NewStudentsCountChart.module.scss';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

const NewStudentsCountChart = ({
    students = []
}) => {
    console.log(students);
    
    const data = {
        labels: students?.map(student => (new Date(student?.date).getDate())),
        datasets: [
            {
                label: 'Dataset 1',
                data: students?.map(student => student?.count),
                borderWidth: 1,
                borderColor: 'rgba(18, 86, 219, 1)',
                tension: 0.4,
            }],
    }

    const options = {
        responsive: true,
        // scales: {
        //     x: {
        //         grid: {
        //             display: true,
        //             color: 'rgba(0, 0, 0, 0.1)',
        //             borderDash: [5, 5],
        //         },
        //     },
        //     y: {
        //         grid: {
        //             display: true,
        //             color: 'rgba(0, 0, 0, 0.1)',
        //             borderDash: [2, 2],
        //         },
        //     },
        // },
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className={cls.cart}>
            <div className={cls.cart__header}>
                <h3 className={cls.cart__header__title}>O’quvchilar oqimi</h3>
                <Select
                    className={cls.cart__select}
                    placeholder='Oy'
                    options={MONTH_OPTIONS}
                />
            </div>
            <Line
                data={data}
                options={options}
                className={cls.cart__chart}
            />
        </div>
    );
}

export default NewStudentsCountChart;