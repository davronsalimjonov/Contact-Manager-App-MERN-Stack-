import { TrendingDownIcon, TrendingUpIcon } from '../icons';
import cls from './PerformanceIndicator.module.scss';

const PerformanceIndicator = ({
    value = 0,
    label = '',
    positively = true
}) => {
    const valueColor = positively ? '#00B69B' : '#F93C65'

    return (
        <div className={cls.indicator}>
            {positively ? <TrendingUpIcon /> : <TrendingDownIcon />}
            {!isNaN(value) && <span className={cls.indicator__value} style={{ color: valueColor }}>{value}%</span>}
            <span className={cls.indicator__label}>{label}</span>
        </div>
    );
}

export default PerformanceIndicator;