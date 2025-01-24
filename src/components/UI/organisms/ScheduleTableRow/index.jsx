import { useNavigate } from 'react-router-dom';
import TableActionButton from '../../moleculs/TableActionButton';
import cls from './ScheduleTableRow.module.scss';

const ScheduleTableRow = ({
    scheduleId,
    lvl,
    date,
    time
}) => {
    const navigate = useNavigate();
    const dropdownMenuItems = [
        { label: 'Dars jadvali', onClick: () => navigate(scheduleId) },
    ]
    return (
        <tr className={cls.row}>
            <td>{lvl ? lvl : "Kiritilmagan"}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>
                <TableActionButton menuItems={dropdownMenuItems} />
            </td>
        </tr>
    );
}

export default ScheduleTableRow;