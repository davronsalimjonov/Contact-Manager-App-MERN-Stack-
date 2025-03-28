import { useState } from 'react';
import toast from 'react-hot-toast';
import { isSameMonth } from 'date-fns';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import Button from '@/components/UI/atoms/Buttons/Button';
import { EditIcon, PlusIcon } from '@/components/UI/atoms/icons';
import PlanFormModal from '@/components/UI/organisms/PlanFormModal';
import SalesMonthlyPlanCard from '@/components/templates/SalesMonthlyPlanCard';
import SalesTeamPlanFulfillmentCard from '@/components/UI/moleculs/SalesTeamPlanFulfillmentCard';
import { useGetGroupsStatistics, useGetSalesStatistics, useSetMonthlyPlanMutation } from '@/hooks/useSales';
import cls from './SalesDirectorDashboard.module.scss';

const SalesDirectorDashboard = () => {
    const navigate = useNavigate()
    const [period] = useOutletContext()
    const [isOpenPlanModal, setIsOpenPlanModal] = useState(false)
    const setMonthlyPlanMutation = useSetMonthlyPlanMutation()
    const { data: salesStatistics, isLoading } = useGetSalesStatistics({ startDate: period?.startDate, endDate: period?.endDate })
    const { data: groupsStatistics } = useGetGroupsStatistics({ startDate: period?.startDate, endDate: period?.endDate })

    const handleSetMonthlyPlan = async (data) => {
        await setMonthlyPlanMutation.mutateAsync(data, {
            onSuccess: () => {
                toast.success('Oylik plan qo’yildi')
                setIsOpenPlanModal(false)
            },
            onError: error => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return !isLoading ? (
        <div className={cls.page}>
            <PlanFormModal
                isOpen={isOpenPlanModal}
                onSubmit={handleSetMonthlyPlan}
                onClose={() => setIsOpenPlanModal(false)}
            />
            <Button
                disabled={!isSameMonth(period?.startDate, new Date())}
                className={cls.page__btn}
                onClick={() => setIsOpenPlanModal(true)}
            >
                {salesStatistics?.plan ? <>Oylik plan tahrirlash <EditIcon fill='white' /></> : <>Oylik plan qo’yish <PlusIcon /></>}
            </Button>
            <SalesMonthlyPlanCard
                dailySale={salesStatistics?.dailySale}
                monthlySale={salesStatistics?.sale}
                monthlyPlan={salesStatistics?.plan}
                dailyPlan={salesStatistics?.dailyPlan}
                donePercentage={salesStatistics?.donePercentage}
                currentMonthSales={salesStatistics?.selectedMonthDailySaleStatistic}
                prevMonthSales={salesStatistics?.selectedPreviousMonthDailySaleStatistic}
            />
            <div className={cls.page__teams}>
                {groupsStatistics?.length > 0 && groupsStatistics?.map(group => (
                    <SalesTeamPlanFulfillmentCard
                        key={group?.id}
                        name={group?.title}
                        logoUrl={group?.url}
                        plan={group?.plan}
                        dailyPlan={group?.dailyPlan}
                        sale={group?.sale}
                        dailySale={group?.dailySale}
                        conversion={group?.conversion}
                        onClick={() => navigate(group?.id)} 
                    />
                ))}
            </div>
        </div>
    ) : (
        <Loader />
    )
}

export default SalesDirectorDashboard;