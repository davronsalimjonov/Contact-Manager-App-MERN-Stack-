import { FilterIcon } from '../../atoms/icons';
import cls from './NotificationTableHeader.module.scss';

const NotificationTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr >
                <th>№</th>
                <th>Nomi</th>
                <th>Jo’natilgan vaqti</th>
                <th>Yangilangan vaqti</th>
                <th>Yuborilishi</th>
                <th><FilterIcon /></th>
            </tr>
        </thead>
    )
}

export default NotificationTableHeader;