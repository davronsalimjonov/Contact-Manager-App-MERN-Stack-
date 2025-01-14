import MetricCard from '@/components/UI/moleculs/MetricCard';
import { HourglassIcon, MetricCashIcon, MetricPersentageIcon, PaseIcon, PersonIcon, SmartWakerIcon } from '@/components/UI/atoms/icons';
import cls from './SellerStatisticsCards.module.scss';

const SellerStatisticsCards = () => {
    return (
        <div className={cls.cards}>
            <div>
                <MetricCard
                    title='Sotuv summasi'
                    value={<>50 000 000 <span className={cls.cards__value__currency}>so’m</span></>}
                    icon={<PersonIcon />}
                    iconBg='rgba(230, 251, 236, 1)'
                    percentage={8.5}
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='Lidlar soni'
                    value='200'
                    icon={<PersonIcon />}
                    iconBg='rgba(231, 238, 251, 1)'
                    percentage={8.5}
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='Konversiyasi'
                    value='50'
                    icon={<MetricPersentageIcon />}
                    iconBg='rgba(196, 3, 132, 0.1)'
                    percentage={-50}
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='Oylik maoshi'
                    value={<>10 000 000 <span className={cls.cards__value__currency}>so’m</span></>}
                    icon={<MetricCashIcon color='rgba(207, 183, 0, 1)' />}
                    iconBg='rgba(207, 183, 0, 0.1)'
                    percentage={8.5}
                    iconStyle={{ borderRadius: '10px' }}
                />
            </div>
            <div>
                <MetricCard
                    title='Bugungi vaqt'
                    value='100 min'
                    icon={<SmartWakerIcon />}
                    iconBg='rgba(196, 3, 132, 0.1)'
                    percentage={8.5}
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='Umumiy vaqt'
                    value='500 min'
                    icon={<HourglassIcon />}
                    iconBg='rgba(0, 212, 59, 0.1)'
                    percentage={-50}
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='O’rtacha vaqt'
                    value='15 min'
                    icon={<PaseIcon />}
                    iconBg='rgba(231, 238, 251, 1)'
                    percentage={-50}
                    iconStyle={{ borderRadius: '10px' }}
                />
            </div>
        </div>
    );
}

export default SellerStatisticsCards;