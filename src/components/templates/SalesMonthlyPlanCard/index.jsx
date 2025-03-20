import { Line } from 'react-chartjs-2';
import cls from './SalesMonthlyPlanCard.module.scss';
import { TrendingUpIcon } from '@/components/UI/atoms/icons';

const data = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
        {
            label: "Wave 1",
            data: [3, 5, 7, 6, 4, 2, 1, 2.5, 3.5, 5, 6.5, 7.2, 8, 6.8, 5, 3, 2.5, 4, 5.5, 7, 9, 8.5, 7, 5.5, 4, 3.5, 3, 4, 5, 6],
            borderColor: "rgba(18, 86, 219, 1)",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
        },
        {
            label: "Wave 2",
            data: [2, 3, 4.5, 3.8, 2.2, 1, 1.5, 2.2, 3, 4, 5, 5.8, 6.2, 5.5, 4.2, 3, 2.8, 3.5, 4, 5.2, 6, 5.8, 5, 4.2, 3.8, 3.5, 3.2, 3.8, 4.5, 5],
            borderColor: "rgba(208, 221, 248, 1)",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: { display: false },
        y: { display: false },
    },
    elements: {
        line: { borderJoinStyle: "round" },
        point: { radius: 0 },
    },
    plugins: {
        datalabels: false,
        legend: { display: false, },
        tooltip: { enabled: false }
    },
};

const SalesMonthlyPlanCard = () => {
    return (
        <div className={cls.card}>
            <div className={cls.card__details}>
                <div className={cls.card__details__title}>
                    <span className={cls.card__details__title__label}>Bugun:</span>
                    <span className={cls.card__details__title__value}>95.000.000🔥</span>
                </div>
                <div className={cls.card__details__monthly}>
                    <span className={cls.card__details__monthly__label}>Oylik:</span>
                    <div className={cls.card__details__monthly__value}>
                        <span className={cls.card__details__monthly__sum}>1.200.000.000</span> 
                        <div className={cls.card__details__monthly__growth}><TrendingUpIcon fill='white' /> +15%</div> 
                    </div>
                    <span className={cls.card__details__monthly__target}>Maqsad: Qo’yilmagan</span>
                </div>
                <div className={cls.card__details__target}>
                    <span className={cls.card__details__target__item}>35 mln/kuniga</span>
                    <span className={cls.card__details__target__item}>75% bajarildi</span>
                </div>
            </div>
            <div className={cls.card__chart}>
                <Line options={options} data={data} />
            </div>
        </div>
    );
}

export default SalesMonthlyPlanCard;