import format from 'date-fns/format'
import Table from '@/components/UI/moleculs/Table';
import { getUserFullName } from '@/utils/lib';
import cls from './FinishedAdaptationsTable.module.scss';
import { SalesmanIcon } from '@/components/UI/atoms/icons';

const FinishedAdaptationsTable = ({ startIndex = 0, items = [] }) => {
    const columns = [
        { key: 'index', title: '№', render: (_, row, index) => startIndex + index + 1, style: { width: '44px' } },
        { key: 'fullname', title: 'Ism,familiya', render: (_, row) => getUserFullName(row?.userCourse?.user) },
        { key: 'phone', title: 'Telefon nomer', render: (_, row) => row?.userCourse?.user?.phone },
        { key: 'course', title: 'Kursi', render: (_, row) => row?.userCourse?.course?.title },
        { key: 'startTime', title: 'kelgan sana', render: (_, row) => format(row?.startDate, 'dd.MM.yyyy HH:mm') },
        { key: 'endTime', title: 'chiqqan sana', render: (_, row) => format(row?.endDate, 'dd.MM.yyyy HH:mm') },
        {
            key: 'mentor', title: 'Mentor', render: (_, row) => (
                <div className={cls.employees}>
                    <span className={cls.employees__mentor}>{getUserFullName(row?.mentor)}</span>
                    <span className={cls.employees__seller}><SalesmanIcon />{getUserFullName(row?.userCourse?.salesManager)}</span>
                </div>
            )
        }
    ]

    return (
        <Table className={cls.table} columns={columns} data={items} />
    );
}

export default FinishedAdaptationsTable;