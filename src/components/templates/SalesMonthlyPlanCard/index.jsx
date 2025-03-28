import { Line } from 'react-chartjs-2';
import { formatPrice } from '@/utils/lib';
import { TrendingUpIcon } from '@/components/UI/atoms/icons';
import cls from './SalesMonthlyPlanCard.module.scss';

function formatUzsCurrency(amount, options = {}) {
    if (typeof amount !== 'number') return 'Некорректное число';

    const absAmount = Math.abs(amount);

    const abbreviations = [
        { value: 1_000_000_000, symbol: 'mlrd' },
        { value: 1_000_000, symbol: 'mln' },
        { value: 1_000, symbol: 'ming' }
    ];

    for (let abbr of abbreviations) {
        if (absAmount >= abbr.value) {
            const formattedAmount = (amount / abbr.value);
            const currencySuffix = options.withoutCurrency ? '' : ' UZS';

            if (formattedAmount % 1 === 0) {
                return `${formattedAmount.toFixed(0)} ${abbr.symbol}${currencySuffix}`;
            }

            const trimmedAmount = parseFloat(formattedAmount.toFixed(2));

            return `${trimmedAmount} ${abbr.symbol}${currencySuffix}`;
        }
    }

    const currencySuffix = options.withoutCurrency ? '' : ' UZS';
    return `${amount}${currencySuffix}`;
}

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

const SalesMonthlyPlanCard = ({ 
    dailySale = 0, 
    monthlySale = 0, 
    monthlyPlan = 0, 
    dailyPlan = 0, 
    donePercentage = 0,
    currentMonthSales = [],
    prevMonthSales = [] 
}) => {
    const formattedDailyPlan = formatUzsCurrency(dailyPlan, { withoutCurrency: true })

    const data = {
        labels: currentMonthSales?.map(sale => sale?.date),
        datasets: [
            {
                label: "Wave 1",
                data: currentMonthSales?.map(sale => sale?.sum),
                borderColor: "rgba(18, 86, 219, 1)",
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 0,
            },
            {
                label: "Wave 2",
                data: prevMonthSales?.map(sale => sale?.sum),
                borderColor: "rgba(208, 221, 248, 1)",
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 0,
            },
        ],
    };

    return (
        <div className={cls.card}>
            <div className={cls.card__details}>
                <div className={cls.card__details__title}>
                    <span className={cls.card__details__title__label}>Bugun:</span>
                    <span className={cls.card__details__title__value}>{formatPrice(dailySale)}🔥</span>
                </div>
                <div className={cls.card__details__monthly}>
                    <span className={cls.card__details__monthly__label}>Oylik:</span>
                    <div className={cls.card__details__monthly__value}>
                        <span className={cls.card__details__monthly__sum}>{formatPrice(monthlySale)}</span>
                        {/* <div className={cls.card__details__monthly__growth}><TrendingUpIcon fill='white' /> {15}%</div> */}
                    </div>
                    <span className={cls.card__details__monthly__target}>Maqsad: {monthlyPlan ? formatPrice(monthlyPlan) : 'Qo’yilmagan'}</span>
                </div>
                <div className={cls.card__details__target}>
                    <span className={cls.card__details__target__item}>{formattedDailyPlan}/kuniga</span>
                    <span className={cls.card__details__target__item}>{donePercentage}% bajarildi</span>
                </div>
            </div>
            <div className={cls.card__chart}>
                <Line options={options} data={data} />
            </div>
        </div>
    );
}

export default SalesMonthlyPlanCard;