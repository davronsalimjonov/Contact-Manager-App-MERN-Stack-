import { FilterIcon } from '../../atoms/icons';
import cls from './NotificationTableHeader.module.scss';

const NotificationTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr >
                <th>№</th>
                <th>Eslatma</th>
                <th>O’rnatilgan vaqti</th>
                <th>Eslatma turi</th>
                <th>Yuborilishi</th>
                <th><FilterIcon /></th>
            </tr>
        </thead>
    )
}

export default NotificationTableHeader;