import MetricCard from '@/components/UI/moleculs/MetricCard';
import { DollarIcon, HourglassIcon, MetricCashIcon, MetricPersentageIcon, PaseIcon, PersonIcon, SmartWakerIcon } from '@/components/UI/atoms/icons';
import cls from './SellerStatisticsCards.module.scss';
import { formatPrice } from '@/utils/lib';

const SellerStatisticsCards = ({
    plan = 0,
    salesAmount = 0,
    leadsCount = 0,
    conversion = 0,
    salary = 0,
    todayTime = 0,
    totalTime = 0,
    averageTime = 0
}) => {
    return (
        <div className={cls.cards}>
            <div>
                <MetricCard
                    title='Sotuv summasi'
                    value={<>{formatPrice(salesAmount)} <span className={cls.cards__value__currency}>so’m</span></>}
                    icon={<DollarIcon />}
                    iconBg='rgba(230, 251, 236, 1)'
                    additionalInformation={<span className={cls.cards__value__additional}>Plan: <span>{formatPrice(plan)} so’m</span></span>}
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='Lidlar soni'
                    value={leadsCount}
                    icon={<PersonIcon />}
                    iconBg='rgba(231, 238, 251, 1)'
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='Konversiyasi'
                    value={conversion}
                    icon={<MetricPersentageIcon />}
                    iconBg='rgba(196, 3, 132, 0.1)'
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='Oylik maoshi'
                    value={<>{formatPrice(salary)} <span className={cls.cards__value__currency}>so’m</span></>}
                    icon={<MetricCashIcon color='rgba(207, 183, 0, 1)' />}
                    iconBg='rgba(207, 183, 0, 0.1)'
                    iconStyle={{ borderRadius: '10px' }}
                />
            </div>
            <div>
                <MetricCard
                    title='Bugungi vaqt'
                    value={`${todayTime || 0} min`}
                    icon={<SmartWakerIcon />}
                    iconBg='rgba(196, 3, 132, 0.1)'
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='Umumiy vaqt'
                    value={`${totalTime || 0} min`}
                    icon={<HourglassIcon />}
                    iconBg='rgba(0, 212, 59, 0.1)'
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='O’rtacha vaqt'
                    value={`${averageTime || 0} min`}
                    icon={<PaseIcon />}
                    iconBg='rgba(231, 238, 251, 1)'
                    iconStyle={{ borderRadius: '10px' }}
                />
            </div>
        </div>
    );
}

export default SellerStatisticsCards;