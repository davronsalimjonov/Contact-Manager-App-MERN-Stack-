import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import { fillMissingSalesData } from '@/utils/chart';
import SalesChart from '@/components/UI/organisms/SalesChart';
import { useGetSaleStatistic, useGetSellerMetrics } from '@/hooks/useSeller';
import SellerStatisticsCards from '@/components/templates/SellerStatisticsCards';
import cls from './SellerStatistics.module.scss';

const SellerStatistics = () => {
    const [period] = useOutletContext()
    const [season, setSeason] = useState('daily');
    const { startDate, endDate, } = period
    const { data: saleStatistic } = useGetSaleStatistic({ type: season });
    const { data: metrics, isLoading: isLoadingMetrics } = useGetSellerMetrics({ startDate, endDate });

    return (
        <div className={cls.page}>
            {isLoadingMetrics ? (
                <Loader />
            ) : (
                <>
                    <SellerStatisticsCards
                        startDate={startDate}
                        endDate={endDate}
                        selectedDate={startDate}
                        plan={metrics?.plan}
                        salesAmount={metrics?.salesAmount}
                        leadsCount={metrics?.leadsCount}
                        conversion={metrics?.konversiya}
                        salary={metrics?.salary}
                        todayTime={metrics?.todayTime}
                        totalTime={metrics?.totalTime}
                        averageTime={metrics?.averageTime}
                    />
                    <SalesChart
                        defaultSeason={season}
                        onChangeTabs={setSeason}
                        data={fillMissingSalesData(saleStatistic, season)}
                    />
                </>
            )}
        </div>
    );
}

export default SellerStatistics;