import Avatar from 'react-avatar';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import StudentStatus from '../../atoms/StudentStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import TableActionButton from '../TableActionButton';
import cls from './StudentsTableRow.module.scss';

const StudentsTableRow = ({
    index = 0,
    avatar = '',
    days = '',
    time = '',
    status = '',
    fullName = '',
    phoneNumber = '',
    unreadedMessagesCount = 0,
    onClick,
    onClickUserInfo,
    onClickChangePassword,
    onClickTransfer,
    onClickChangeCallMentor,
    menuButtons = true
}) => {
    const formatedPhoneNumber = formatPhoneNumberIntl(phoneNumber)

    const dropdownMenuItems = [
        { label: 'O’quvchi ma’lumotlari', onClick: onClickUserInfo },
        { label: 'Parol o’zgartirish', onClick: onClickChangePassword },
        { label: 'Transfer qilish', onClick: onClickTransfer },
        { label: 'Nazoratchi mentorni ozgartirish', onClick: onClickChangeCallMentor }
    ]

    return (
        <tr className={cls.row} onClick={onClick}>
            <td>{index}</td>
            <td className={cls.row__name}>
                <div className={cls.row__notification}>
                    <Avatar
                        round
                        size={32}
                        src={avatar}
                        name={fullName}
                    />
                    {unreadedMessagesCount > 0 && <span className={cls.row__notification__badge}>{unreadedMessagesCount > 9 ? '9+' : unreadedMessagesCount}</span>}
                </div>
                <span title={fullName}>{fullName}</span>
            </td>
            <td><span title={days}>{days ? days : <EmptyDataText />}</span></td>
            <td><span title={time}>{time ? time : <EmptyDataText />}</span></td>
            <td>
                <span title={formatedPhoneNumber}>{formatedPhoneNumber ? formatedPhoneNumber : <EmptyDataText />}</span>
            </td>
            <td><StudentStatus status={status} /></td>
            <td onClick={(e) => (e.stopPropagation())}>
                {menuButtons && <TableActionButton menuItems={dropdownMenuItems} />}
            </td>
        </tr>
    );
}

export default StudentsTableRow;