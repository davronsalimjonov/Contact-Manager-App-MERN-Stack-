import Avatar from '@/components/UI/atoms/Avatar';
import format from 'date-fns/format'
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { isSameDay } from '@/utils/time';
import StudentStatus from '../../atoms/StudentStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import TableActionButton from '../TableActionButton';
import cls from './MainMentorStudentsTableRow.module.scss';

const MainMentorStudentsTableRow = ({
    index = 0,
    userCourseId = '',
    group = '',
    avatar = '',
    status = '',
    fullName = '',
    phoneNumber = '',
    messageCount = 0,
    checkbox = false,
    checked = false,
    lastLogin,
    onChangeCheckbox,
    onClickTransfer,
    onClickChangePassword,
    onClickStudentInfo,
    onClickChangeCallMentor,
    onClick
}) => {
    const formatedPhoneNumber = formatPhoneNumberIntl(phoneNumber)

    const dropdownMenuItems = [
        { label: 'O’quvchi ma’lumotlari', onClick: onClickStudentInfo },
        { label: 'Transfer Student', onClick: onClickTransfer },
        { label: "O'quvchi Parolini O'zgartirish", onClick: onClickChangePassword },
        { label: 'Nazoratchi mentor ozgartirish', onClick: onClickChangeCallMentor }
    ]

    return (
        <tr className={cls.row} onClick={onClick}>
            {checkbox && (
                <td>
                    <input 
                        type="checkbox" 
                        checked={checked} 
                        value={userCourseId}
                        onClick={e => e.stopPropagation()} 
                        onChange={onChangeCheckbox}
                    />
                </td>
            )}
            <td>{index}</td>
            <td className={cls.row__name}>
                <div className={cls.row__notification}>
                    <Avatar
                        round
                        size={32}
                        src={avatar}
                        name={fullName}
                    />
                    {messageCount > 0 && <span className={cls.row__notification__badge}>{messageCount}</span>}
                </div>
                <span title={fullName}>{fullName}</span>
            </td>
            <td><span title={formatedPhoneNumber}>{formatedPhoneNumber ? formatedPhoneNumber : <EmptyDataText />}</span></td>
            <td><span title={group}>{group || <EmptyDataText />}</span></td>
            <td><StudentStatus status={status} /></td>
            <td>{lastLogin ? format(new Date(lastLogin), isSameDay(lastLogin, new Date()) ? 'HH:mm' : 'dd.MM.yyyy') : <EmptyDataText />}</td>
            <td onClick={e => e.stopPropagation()}>
                <TableActionButton menuItems={dropdownMenuItems} />
            </td>
        </tr>
    );
}

export default MainMentorStudentsTableRow;