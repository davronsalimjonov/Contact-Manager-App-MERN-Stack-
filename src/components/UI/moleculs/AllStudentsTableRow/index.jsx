import Avatar from 'react-avatar';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { formatDate } from '@/utils/formatDate';
import StudentStatus from '../../atoms/StudentStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import TableActionButton from '../TableActionButton';
import cls from './AllStudentsTableRow.module.scss';

const AllStudentsTableRow = ({
    index,
    avatar,
    fullName,
    phoneNumber,
    status,
    mainTeacher,
    secondTeacher,
    level,
    course,
    group,
    courseEndDate,
    isAdaptation = false,
    adaptationTecherFullName = '',
    onClickUserInfo,
    onClickChangePassword,
    onClickTransfer
}) => {

    const menuButtons = [
        { label: 'Oquvchi malumotlari', onClick: onClickUserInfo },
        { label: 'Parol ozgartirish', onClick: onClickChangePassword },
        { label: 'Transfer', onClick: onClickTransfer }
    ]

    return (
        <tr className={cls.row}>
            <td>{index}</td>
            <td className={cls.row__avatar}>
                <Avatar src={avatar} name={fullName} size={24} round />
                {fullName}
            </td>
            <td>{formatPhoneNumberIntl(phoneNumber)}</td>
            <td ><StudentStatus status={status} /></td>
            {isAdaptation ? (
                <td className={cls.row__teachers__adaptation}>{adaptationTecherFullName || <EmptyDataText />}</td>
            ) : (
                <td className={cls.row__teachers}>
                    <p className={cls.row__teachers__main}>{mainTeacher || <EmptyDataText />}</p>
                    <p className={cls.row__teachers__second}>{secondTeacher || <EmptyDataText />}</p>
                </td>
            )}
            <td>{level || <EmptyDataText />}</td>
            <td className={cls.row__course}>{course || <EmptyDataText />}</td>
            <td>{group || <EmptyDataText />}</td>
            <td>{formatDate(courseEndDate)}</td>
            <td><TableActionButton menuItems={menuButtons} /></td>
        </tr>

    )
}

export default AllStudentsTableRow;