import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import { useGetAppRate } from '@/hooks/useServiceStatistics';
import AppRateTable from '@/components/templates/AppRateTable';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import cls from './AppRateStatistics.module.scss';

const AppRateStatistics = () => {
    const [period] = useOutletContext()
    const [pagination, setPagination] = useState({ page: 0, limit: 10 });
    const { data: appRate, isLoading } = useGetAppRate({
        type: 'app',
        page: pagination.page + 1,
        limit: pagination.limit,
        startDate: period.startDate,
        endDate: period.endDate
    });

    return !isLoading ? (
        <div className={cls.page}>
            <div className={cls.page__table}>
                <AppRateTable 
                    items={appRate?.items} 
                    startIndex={pagination.page * pagination.limit} 
                />
            </div>
            <Pagination
                initialPage={pagination.page}
                pageCount={appRate?.meta?.totalPages}
                onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
            />
        </div>
    ) : (
        <Loader />
    )
}

export default AppRateStatistics;