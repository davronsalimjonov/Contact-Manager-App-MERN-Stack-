import dayjs from 'dayjs';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useOutletContext } from 'react-router-dom';
import { MONTH_OPTIONS } from '@/constants/form';
import { useGetUserId } from '@/hooks/useGetUser';
import { useGetActiveStudentsCount } from '@/hooks/useStatistic';
import Select from '../../atoms/Form/Select';
import Loader from '../../atoms/Loader';
import cls from './ActiveStudentsCountChart.module.scss';

const customPointPlugin = {
    id: 'customPointPlugin',
    afterDatasetDraw: (chart) => {
        const { ctx, data } = chart;
        const dataset = data.datasets[0];

        dataset.data.forEach((value, index) => {
            if (value !== null) {
                const meta = chart.getDatasetMeta(0);
                const point = meta.data[index];

                // Рисуем светло-голубой ореол
                ctx.beginPath();
                ctx.arc(point.x, point.y, 16, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(18, 86, 219, 0.2)';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(point.x, point.y, 7, 0, 2 * Math.PI);
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Отображаем текст значения над точкой
                ctx.font = 'regular 10px Arial';
                ctx.fillStyle = '#3A4B5A';
                ctx.textAlign = 'center';
                ctx.fillText(value, point.x, point.y - 17);
            }
        });
    }
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        datalabels: { display: false },
    },
    scales: {
        x: {
            grid: { drawTicks: false, borderDash: [3, 3] },
            border: { display: false },
            ticks: { padding: 0 }
        },
        y: {
            grid: { drawTicks: false, borderDash: [3, 3] },
            border: { display: false },
            ticks: { stepSize: 20 },
            suggestedMin: 1, // Минимальное значение Y, если данных нет
            suggestedMax: 100 
        }
    },
    elements: {
        line: { borderWidth: 1 },
        point: { radius: 0, display: false, hoverRadius: 0 }
    }
};

const fillMissingMonthDates = (data = [], month, year) => {
    const formattedMonth = String(month).padStart(2, "0");
    const daysInMonth = dayjs(`${year}-${formattedMonth}-01`).daysInMonth();
    
    const filledData = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const existing = data.find(item => dayjs(item.date).date() === day);

        return {
            date: day, // Возвращаем число вместо даты
            count: existing ? Number(existing.count) : null, // Преобразуем count в число
        };
    });

    return filledData;
};

const ActiveStudentsCountChart = ({ mentorId }) => {
    const [period] = useOutletContext();
    const userId = mentorId || useGetUserId()
    const [dateRange, setDateRange] = useState({ startDate: dayjs().startOf('month').format('YYYY-MM-DD'), endDate: dayjs().endOf('month').format('YYYY-MM-DD') });
    const { data: newStudentsCount, isLoading: isLoadingNewStudentsCount } = useGetActiveStudentsCount({ mentorId: userId, startDate: dateRange.startDate, endDate: dateRange?.endDate })
    const filledData = fillMissingMonthDates(newStudentsCount, new Date(dateRange.startDate).getMonth() + 1, new Date(dateRange.startDate).getFullYear());

    const handleMonthChange = (month) => {
        month = Number(month)
        const year = new Date(period.startDate).getFullYear();
        const startDate = dayjs(new Date(year, month - 1, 1).toISOString()).format('YYYY-MM-DD');
        const endDate = dayjs(new Date(year, month, 0).toISOString()).format('YYYY-MM-DD');
        setDateRange({ startDate, endDate });
    };

    const data = {
        labels: filledData?.map(student => student?.date),
        datasets: [{
            label: 'Oquvchilar soni',
            data: filledData?.map(student => student?.count),
            borderColor: '#3B82F6',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#3B82F6',
            pointRadius: 7,
            pointHoverRadius: 7,
            tension: 0.5,
            fill: true,
        }],
    }

    return (
        <div className={cls.cart}>
            <div className={cls.cart__header}>
                <h3 className={cls.cart__header__title}>O'quvchilar aktivligi</h3>
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
                        plugins={[customPointPlugin]}
                    />
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
}

export default ActiveStudentsCountChart;