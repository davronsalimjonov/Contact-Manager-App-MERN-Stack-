import { getUserFullName } from '@/utils/lib';
import Table from '@/components/UI/moleculs/Table';
import { convertMinutesToHoursAndMinutes } from '@/utils/time';
import cls from './SellerStatisticsTableByCall.module.scss';

const columns = [
    { key: 'index', title: '№', render: (_, row, index) => index + 1, style: { width: '41px' } },
    { key: 'fullName', title: 'Ism, familiya', render: (_, row) => getUserFullName(row) },
    { key: 'callCount', title: 'Qo\'g\'iroqlar soni', render: (_, row) => row?.callCount + ' ta' },
    { key: 'successCallCount', title: 'Muvaffaqiyatli', render: (_, row) => row?.successCallCount + ' ta' },
    { key: 'time', title: 'Umumiy vaqt', render: (_, row) => convertMinutesToHoursAndMinutes(row?.time) },
]

const SellerStatisticsTableByCall = ({ items = [] }) => {
    return (
        <Table columns={columns} data={items} />
    );
}

export default SellerStatisticsTableByCall;