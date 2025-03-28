import { useState } from 'react';
import toast from 'react-hot-toast';
import { isSameMonth } from 'date-fns';
import { useOutletContext } from 'react-router-dom';
import Tabs from '@/components/UI/moleculs/Tabs';
import Loader from '@/components/UI/atoms/Loader';
import Button from '@/components/UI/atoms/Buttons/Button';
import { EditIcon, PlusIcon } from '@/components/UI/atoms/icons';
import PlanFormModal from '@/components/UI/organisms/PlanFormModal';
import SalesMonthlyPlanCard from '@/components/templates/SalesMonthlyPlanCard';
import SellerStatisticsTableByCall from '@/components/templates/SellerStatisticsTableByCall';
import SellerStatisticsTableBySumm from '@/components/templates/SellerStatisticsTableBySumm';
import { useGetGroupStatistic, useGetSalesStatistics, useGetTeamLeaderGroup, useSetGroupPlanMutation } from '@/hooks/useSales';
import cls from './Dashboard.module.scss';

const Dashboard = () => {
    const [period] = useOutletContext()
    const [tab, setTab] = useState('summ')
    const [isOpenPlanModal, setIsOpenPlanModal] = useState(false)
    const setGroupPlanMutation = useSetGroupPlanMutation()
    const { data: group, isLoading } = useGetTeamLeaderGroup()
    const { data: salesStatistics, isLoading: isLoadingSalesStatistics } = useGetSalesStatistics({ startDate: period?.startDate, endDate: period?.endDate, group: group?.id }, { enabled: !!group?.id })
    const { data: groupStatistic, isLoading: isLoadingGroupStatistic } = useGetGroupStatistic(group?.id, { startDate: period?.startDate, endDate: period?.endDate }, { enabled: !!group?.id })

    const handleSetMonthlyPlan = async (data) => {
        await setGroupPlanMutation.mutateAsync({ id: group?.id, body: data }, {
            onSuccess: () => {
                toast.success('Plan qo’yildi')
                setIsOpenPlanModal(false)
            },
            onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (!isLoading && !isLoadingSalesStatistics && !isLoadingGroupStatistic) ? (
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
            <Tabs
                options={[
                    { value: 'summ', label: 'Summa bo’yicha' },
                    { value: 'call', label: 'SIP bo’yicha' }
                ]}
                onChange={setTab}
            />
            {tab === 'summ' && <SellerStatisticsTableBySumm items={groupStatistic?.items} />}
            {tab === 'call' && <SellerStatisticsTableByCall items={groupStatistic?.items} />}
        </div>
    ) : (
        <Loader />
    )
}

export default Dashboard;