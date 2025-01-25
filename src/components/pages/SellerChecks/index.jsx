import { useState } from 'react';
import Loader from '@/components/UI/atoms/Loader';
import { useGetSellerInvoices } from '@/hooks/useSeller';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import SellerChecksTable from '@/components/templates/SellerChecksTable';
import cls from './SellerChecks.module.scss';

const SellerChecks = () => {
    const [pagination, setPagination] = useState({ page: 0, limit: 15 })
    const { data: invoices, isLoading } = useGetSellerInvoices({ page: pagination.page + 1, limit: pagination.limit })
    const checks = invoices?.records?.map((invoice, index) => ({ ...invoice, index: (pagination.limit * pagination.page) + (index + 1) })) || []

    return (
        !isLoading ? (
            <div className={cls.page}>
                <SellerChecksTable checks={checks} />
                {checks?.length > 0 && (
                    <Pagination 
                        initialPage={pagination.page}
                        pageCount={invoices?.totalPages} 
                        onPageChange={({ selected: page }) => setPagination({ ...pagination, page})} 
                    />
                )}
            </div>
        ) : (
            <Loader />
        )
    );
}

export default SellerChecks;