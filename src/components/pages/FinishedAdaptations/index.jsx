import { useGetFinishedAdaptations } from '@/hooks/useAdaptation';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import FinishedAdaptationsTable from '@/components/templates/FinishedAdaptationsTable';
import cls from './FinishedAdaptations.module.scss';
import { useState } from 'react';
import Loader from '@/components/UI/atoms/Loader';

const FinishedAdaptations = () => {
    const [pagination, setPagination] = useState({ page: 0, limit: 15 })
    const { data: finishedAdaptations, isLoading } = useGetFinishedAdaptations({ page: pagination.page + 1, limit: pagination.limit })

    return !isLoading ? (
        <div className={cls.page}>
            <FinishedAdaptationsTable items={finishedAdaptations?.items} />
            <Pagination
                initialPage={pagination.page}
                pageCount={finishedAdaptations?.meta?.totalPages}
                page={pagination.page}
                onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
            />
        </div>
    ) : (
        <Loader />
    )
}

export default FinishedAdaptations;