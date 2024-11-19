import dayjs from 'dayjs';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { MONTH_OPTIONS } from '@/constants/form';
import { useGetUserId } from '@/hooks/useGetUser';
import { getNewStudentsCount } from '@/services/statistic';
import Select from '../../atoms/Form/Select';
import cls from './NewStudentsCountChart.module.scss';
import Loader from '../../atoms/Loader';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

const NewStudentsCountChart = ({ }) => {
    const userId = useGetUserId()
    const [dateRange, setDateRange] = useState({ startDate: dayjs().startOf('month').format('YYYY-MM-DD'), endDate: dayjs().endOf('month').format('YYYY-MM-DD') });
    const { data: newStudentsCount, isLoading: isLoadingNewStudentsCount } = useQuery(['statistic', 'new-students-count', dateRange?.startDate, dateRange.endDate], () => getNewStudentsCount({ teacher: userId, ...dateRange }))

    const handleMonthChange = (month) => {
        month = Number(month)
        const year = new Date().getFullYear();
        const startDate = dayjs(new Date(year, month - 1, 1).toISOString()).format('YYYY-MM-DD');
        const endDate = dayjs(new Date(year, month, 0).toISOString()).format('YYYY-MM-DD');
        setDateRange({ startDate, endDate });
    };

    const data = {
        labels: newStudentsCount?.map(student => (new Date(student?.date).getDate())),
        datasets: [{
            label: 'Oquvchilar soni',
            data: newStudentsCount?.map(student => student?.count),
            borderWidth: 1,
            borderColor: 'rgba(18, 86, 219, 1)',
            tension: 0.4,
        }],
    }

    return (
        <div className={cls.cart}>
            <div className={cls.cart__header}>
                <h3 className={cls.cart__header__title}>O’quvchilar oqimi</h3>
                <Select
                    placeholder='Oy'
                    isSearchable={false}
                    options={MONTH_OPTIONS}
                    className={cls.cart__select}
                    onChange={({ value }) => handleMonthChange(value)}
                    defaultValue={MONTH_OPTIONS[new Date().getMonth()]}
                />
            </div>
            <div className={cls.cart__body}>
                {!isLoadingNewStudentsCount ? (
                    <Line
                        data={data}
                        options={options}
                        className={cls.cart__chart}
                    />
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
}

export default NewStudentsCountChart;