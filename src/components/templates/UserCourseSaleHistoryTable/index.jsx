import UserCourseSaleHistoryTableRow from '@/components/UI/moleculs/UserCourseSaleHistoryTableRow';
import cls from './UserCourseSaleHistoryTable.module.scss';

const UserCourseSaleHistoryTable = ({ items = [] }) => {
    return (
        <table className={cls.table}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Sotuv turi</th>
                    <th>Sotib olgan sana</th>
                    <th>Nechchi oy</th>
                </tr>
            </thead>
            <tbody>
                {items?.map((item, index) => (
                    <UserCourseSaleHistoryTableRow 
                        key={item?.id}
                        index={index + 1}
                        date={item?.date}
                        type={item?.type}
                        month={item?.month}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default UserCourseSaleHistoryTable;