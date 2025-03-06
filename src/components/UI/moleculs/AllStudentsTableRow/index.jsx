import Avatar from 'react-avatar';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import format from 'date-fns/format'
import StudentStatus from '../../atoms/StudentStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import TableActionButton from '../TableActionButton';
import cls from './AllStudentsTableRow.module.scss';
import { isSameDay } from '@/utils/time';

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
    lastLogin,
    isAdaptation = false,
    adaptationTecherFullName = '',
    onClickUserInfo,
    onClickChangePassword,
    onClickTransfer,
    onClickChangeCallMentor
}) => {

    const menuButtons = [
        { label: 'Oquvchi malumotlari', onClick: onClickUserInfo },
        { label: 'Parol ozgartirish', onClick: onClickChangePassword },
        { label: 'Transfer', onClick: onClickTransfer },
        { label: 'Nazoratchi mentor ozgartirish', onClick: onClickChangeCallMentor }
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
            <td>{lastLogin ? format(new Date(lastLogin), isSameDay(lastLogin, new Date()) ? 'HH:mm' : 'dd.MM.yyyy') : <EmptyDataText />}</td>
            <td><TableActionButton menuItems={menuButtons} /></td>
        </tr>

    )
}

export default AllStudentsTableRow;