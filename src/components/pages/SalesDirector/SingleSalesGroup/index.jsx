import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import Tabs from '@/components/UI/moleculs/Tabs';
import Loader from '@/components/UI/atoms/Loader';
import { useGetGroupStatistic } from '@/hooks/useSales';
import SellerStatisticsTableBySumm from '@/components/templates/SellerStatisticsTableBySumm';
import SellerStatisticsTableByCall from '@/components/templates/SellerStatisticsTableByCall';
import cls from './SingleSalesGroup.module.scss';

const SingleSalesGroup = () => {
    const { groupId } = useParams()
    const [period] = useOutletContext()
    const { data: statistics, isLoading } = useGetGroupStatistic(groupId, { startDate: period?.startDate, endDate: period?.endDate })
    const [tab, setTab] = useState('summ')

    return !isLoading ? (
        <div className={cls.page}>
            <h1 className={cls.page__title}>“{statistics?.group}” jamoasi</h1>
            <Tabs
                options={[
                    { value: 'summ', label: 'Summa bo’yicha' },
                    { value: 'call', label: 'SIP bo’yicha' }
                ]}
                onChange={setTab}
            />
            {tab === 'summ' && <SellerStatisticsTableBySumm items={statistics?.items} />}
            {tab === 'call' && <SellerStatisticsTableByCall items={statistics?.items} />}
        </div>
    ) : (
        <Loader />
    )
}

export default SingleSalesGroup;