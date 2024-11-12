import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '@/utils/lib';
import StudentStatus from '../../atoms/StudentStatus';
import TableActionButton from '../../moleculs/TableActionButton';
import cls from './StudentsTableRow.module.scss';
import EmptyTableCellText from '../../atoms/EmptyTableCellText';

const StudentsTableRow = ({
    index = 0,
    days = '',
    time = '',
    status = '',
    userId = '',
    fullName = '',
    phoneNumber = '',
}) => {
    const navigate = useNavigate()
    const formatedPhoneNumber = formatPhoneNumber(phoneNumber)
    
    const dropdownMenuItems = [
        { label: 'O’quvchi ma’lumotlari', onClick: () => navigate(userId) },
        { label: 'Transfer student' },
    ]

    return (
        <tr className={cls.row}>
            <td>{index}</td>
            <td><span title={fullName}>{fullName}</span></td>
            <td><span title={days}>{days ? days : <EmptyTableCellText />}</span></td>
            <td><span title={time}>{time ? time : <EmptyTableCellText />}</span></td>
            <td>
                <span title={formatedPhoneNumber}>{formatedPhoneNumber ? formatedPhoneNumber : <EmptyTableCellText />}</span>
            </td>
            <td><StudentStatus status={status} /></td>
            <td>
                <TableActionButton menuItems={dropdownMenuItems} />
            </td>
        </tr>
    );
}

export default StudentsTableRow;