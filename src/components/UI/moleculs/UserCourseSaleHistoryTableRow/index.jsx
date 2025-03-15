import format from 'date-fns/format';
import { SALE_TYPE_OPTIONS } from '@/constants/form';
import cls from './UserCourseSaleHistoryTableRow.module.scss';

const typeLabel = (type) => {
    return SALE_TYPE_OPTIONS.find(option => option.value === type)?.label
}

const UserCourseSaleHistoryTableRow = ({ index, date, month, type }) => {
    return (
        <tr className={cls.row}>
           <td>{index}</td> 
           <td>{typeLabel(type)}</td>
           <td>{format(date, 'dd.MM.yyyy')}</td>
           <td>{month}</td>
        </tr>
    );
}

export default UserCourseSaleHistoryTableRow;