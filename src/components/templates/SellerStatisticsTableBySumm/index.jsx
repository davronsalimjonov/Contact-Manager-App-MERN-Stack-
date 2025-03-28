import Table from '@/components/UI/moleculs/Table';
import cls from './SellerStatisticsTableBySumm.module.scss';
import { formatPrice, getUserFullName } from '@/utils/lib';

const columns = [
    { key: "index", title: "№", render: (_, row, index) => index + 1, style: { width: '41px' } },
    { key: "fullName", title: "Ism, familiya", render: (_, row) => getUserFullName(row) },
    { key: "plan", title: "Oylik rejasi", render: (_, row) => row?.plan && formatPrice(row?.plan) + ' so\'m' },
    { key: "sale", title: "Bajargani", render: (_, row) => formatPrice(row?.sale) + ' so\'m' },
    { key: "conversion", title: "Konversiya", render: (_, row) => row?.conversion + '%' },
    { key: "salary", title: "Oyligi", render: (_, row) => formatPrice(row?.salary) + ' so\'m' }
]

const SellerStatisticsTableBySumm = ({ items = [] }) => {
    return (
        <Table columns={columns} data={items} />
    );
}

export default SellerStatisticsTableBySumm;