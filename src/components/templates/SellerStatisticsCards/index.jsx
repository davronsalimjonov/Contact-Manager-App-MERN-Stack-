import { useState } from 'react';
import { formatPrice } from '@/utils/lib';
import MetricCard from '@/components/UI/moleculs/MetricCard';
import PlanFormModal from '@/components/UI/organisms/PlanFormModal';
import { DollarIcon, HourglassIcon, MetricCashIcon, MetricPersentageIcon, PaseIcon, PersonIcon, PlusIcon, SmartWakerIcon } from '@/components/UI/atoms/icons';
import cls from './SellerStatisticsCards.module.scss';
import { useSellerMutations } from '@/hooks/useSeller';
import toast from 'react-hot-toast';
import Button from '@/components/UI/atoms/Buttons/Button';
import CommingSoomModal from '@/components/UI/organisms/CommingSoomModal';

const SellerStatisticsCards = ({
    startDate, 
    endDate,
    selectedDate,
    plan = 0,
    salesAmount = 0,
    leadsCount = 0,
    conversion = 0,
    salary = 0,
    todayTime = 0,
    totalTime = 0,
    averageTime = 0
}) => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isOpenCommingSoon, setIsOpenCommingSoon] = useState(false);
    const { sellerPlanMutation } = useSellerMutations({startDate, endDate})

    const handleSetPlan = async (data) => {
        data.date = selectedDate
        await sellerPlanMutation.mutateAsync(data, {
            onSuccess: () => setIsOpenForm(false),
            onError: (res) => toast.error(res?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <div className={cls.cards}>
            <PlanFormModal
                isOpen={isOpenForm}
                onClose={() => setIsOpenForm(false)}
                onSubmit={handleSetPlan}
            />
            <CommingSoomModal
                isOpen={isOpenCommingSoon}
                onClose={() => setIsOpenCommingSoon(false)}
            />
            <div>
                <MetricCard
                    title='Sotuv summasi'
                    value={<>{formatPrice(salesAmount)} <span className={cls.cards__value__currency}>so’m</span></>}
                    icon={<DollarIcon />}
                    iconBg='rgba(230, 251, 236, 1)'
                    additionalInformation={(
                        <span className={cls.cards__value__plan}>
                            Plan: {plan ? (
                                <span>{formatPrice(plan)} so’m</span>
                            ) : (
                                <button onClick={() => setIsOpenForm(true)}><PlusIcon fill='rgba(0, 212, 59, 1)' /></button>
                            )}
                        </span>
                    )}
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='Oylik maoshi'
                    value={<>{formatPrice(salary)} <span className={cls.cards__value__currency}>so’m</span></>}
                    icon={<MetricCashIcon color='rgba(207, 183, 0, 1)' />}
                    iconBg='rgba(207, 183, 0, 0.1)'
                    iconStyle={{ borderRadius: '10px' }}
                    additionalInformation={<Button className={cls.cards__value__btn} onClick={() => setIsOpenCommingSoon(true)}>Pulni yechib olish</Button>}
                />
                <MetricCard
                    title='Lidlar soni'
                    value={leadsCount || 0}
                    icon={<PersonIcon />}
                    iconBg='rgba(231, 238, 251, 1)'
                    iconStyle={{ borderRadius: '10px' }}
                />
                <MetricCard
                    title='Konversiyasi'
                    value={conversion || 0}
                    icon={<MetricPersentageIcon />}
                    iconBg='rgba(196, 3, 132, 0.1)'
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