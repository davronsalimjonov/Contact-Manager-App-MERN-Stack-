import dayjs from 'dayjs';
import { formatPrice } from '@/utils/lib';
import EmptyDataText from '../../atoms/EmptyDataText';
import cls from './ChecksTableRow.module.scss';

const ChecksTableRow = ({
    index = 1,
    fullName = '',
    date = '',
    paymentMethod = '',
    sum = 0,
    profit = 0,
}) => {
    return (
        <tr className={cls.row}>
            <td>{index}</td>
            <td>{fullName}</td>
            <td>{dayjs(date).format('DD/MM/YYYY  HH:mm:ss')}</td>
            <td>{paymentMethod}</td>
            <td>{formatPrice(sum || 0)} UZS</td>
            <td className={cls.row__profit}>+{formatPrice(profit || 0)} UZS</td>
            <td className={cls.row__loss}><EmptyDataText /></td>
        </tr>
    );
}

export default ChecksTableRow;