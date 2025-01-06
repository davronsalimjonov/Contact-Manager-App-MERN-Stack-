import cls from './NotificationTableRow.module.scss';

import { formatDate } from '@/utils/formatDate';
import { getFormatTime } from '@/utils/formatTime';

import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../../atoms/icons';




const NotificationTableRow = ({
    index,
    name,
    sendDate,
    updateDate,
    sendingType
}) => {
    const navigate = useNavigate();

    return (

        <tr className={cls.row} onClick={() => navigate(`/students/${studentId}`)}>

            <td>{index}.</td>
            <td>{name.length > 40 ? name.substring(0, 40) + "..." : name}</td>
            <td>{getFormatTime(sendDate) + ", " + formatDate(sendDate)}</td>
            <td>{getFormatTime(updateDate) + ", " + formatDate(updateDate)}</td>
            <td>{sendingType}</td>
            <td><EditIcon/></td>
        </tr>

    )
}

export default NotificationTableRow;