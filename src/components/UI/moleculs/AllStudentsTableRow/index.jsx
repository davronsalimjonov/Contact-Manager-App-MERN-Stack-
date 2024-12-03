import cls from './AllstudentsTableRow.module.scss';
import Avatar from 'react-avatar';
import getStyleByStatus from '@/utils/getStyleByStatus';
import { formatDate } from '@/utils/formatDate';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';




const AllStudentsTableRow = ({
    index,
    fullName,
    url,
    phoneNumber,
    status,
    teacher,
    secondTeacher,
    level,
    studentId,
    startDate
}) => {
    const navigate = useNavigate();

    return (

        <tr className={cls.row} onClick={() => navigate(`/students/${studentId}`)}>

            <td>{index}</td>
            <td className={cls.row__avatar}>
                <Avatar src={url} name={fullName} size={24} round />
                {fullName}
            </td>
            <td>{formatPhoneNumberIntl(phoneNumber)}</td>
            <td ><span className={cls.row__status} style={getStyleByStatus(status)}>{status}</span></td>
            <td className={cls.row__teachers}>
                <p className={cls.row__teacher}>{teacher}</p>
                <p className={cls.row__second__teacher}>{secondTeacher}</p>
            </td>
            <td>{level}</td>
            <td>{formatDate(startDate)}</td>
        </tr>

    )
}

export default AllStudentsTableRow;