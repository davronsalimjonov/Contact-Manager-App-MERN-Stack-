import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '@/utils/lib';
import StudentStatus from '../../atoms/StudentStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import TableActionButton from '../../moleculs/TableActionButton';
import cls from './StudentsTableRow.module.scss';

const StudentsTableRow = ({
    index = 0,
    days = '',
    time = '',
    status = '',
    userId = '',
    courseId = '',
    fullName = '',
    phoneNumber = '',
}) => {
    const navigate = useNavigate()
    const formatedPhoneNumber = formatPhoneNumber(phoneNumber)
    
    const dropdownMenuItems = [
        { label: 'O’quvchi ma’lumotlari', onClick: () => navigate(courseId) },
    ]

    return (
        <tr className={cls.row}>
            <td>{index}</td>
            <td><span title={fullName}>{fullName}</span></td>
            <td><span title={days}>{days ? days : <EmptyDataText />}</span></td>
            <td><span title={time}>{time ? time : <EmptyDataText />}</span></td>
            <td>
                <span title={formatedPhoneNumber}>{formatedPhoneNumber ? formatedPhoneNumber : <EmptyDataText />}</span>
            </td>
            <td><StudentStatus status={status} /></td>
            <td>
                <TableActionButton menuItems={dropdownMenuItems} />
            </td>
        </tr>
    );
}

export default StudentsTableRow;