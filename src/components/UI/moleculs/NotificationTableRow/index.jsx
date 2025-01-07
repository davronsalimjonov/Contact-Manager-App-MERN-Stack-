import cls from './NotificationTableRow.module.scss';

import { formatDate } from '@/utils/formatDate';

import { useNavigate } from 'react-router-dom';
import { EditIcon, TrashIcon } from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';




const NotificationTableRow = ({
    id,
    index,
    description,
    time,
    date,
    isAuto,
    login,
    handleDelete
}) => {
      return (
        <tr className={cls.row}>
            <td>{index}.</td>
            <td>{description?.length > 40 ? description.substring(0, 40) + "..." : description}</td>
            <td>{time&&time + ", " + formatDate(date)}</td>
            <td>{ login ?`${login} kun kirmaganlarga`:'Hammaga'}</td>
            <td>{isAuto?"Automatik":"Qo'lda"}</td>
            <td onClick={()=>handleDelete(id)}><TrashIcon/> </td>
        </tr>

    )
}

export default NotificationTableRow;