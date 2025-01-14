import { useNavigate } from 'react-router-dom';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import StudentStatus from '../../atoms/StudentStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import TableActionButton from '../TableActionButton';
import cls from './StudentsTableRow.module.scss';
import Avatar from 'react-avatar';

const StudentsTableRow = ({
    index = 0,
    avatar = '',
    days = '',
    time = '',
    status = '',
    chatId = '',
    fullName = '',
    phoneNumber = '',
    userCourseId = '',
    hidden = false,
    unreadedMessagesCount = 0
}) => {
    const navigate = useNavigate()
    const formatedPhoneNumber = formatPhoneNumberIntl(phoneNumber)

    const dropdownMenuItems = [
        { label: 'O’quvchi ma’lumotlari', onClick: () => navigate(userCourseId) },
    ]

    return (
        <tr className={cls.row} onClick={() => navigate(`/students/chat/${chatId}`)}>
            <td>{index}</td>
            <td className={cls.row__name}>
                <div className={cls.row__notification}>
                    <Avatar
                        round
                        size={32}
                        src={avatar}
                        name={fullName}
                    />
                    {unreadedMessagesCount > 0 && <span className={cls.row__notification__badge}>{unreadedMessagesCount > 9 ? '9+' : unreadedMessagesCount  }</span>}
                </div>
                <span title={fullName}>{fullName}</span>
            </td>
            <td className={`${hidden ? cls.hidden : ""} ${cls.someOtherClass}`.trim()}><span title={days}>{days ? days : <EmptyDataText />}</span></td>
            <td className={`${hidden ? cls.hidden : ""} ${cls.someOtherClass}`.trim()}><span title={time}>{time ? time : <EmptyDataText />}</span></td>
            <td>
                <span title={formatedPhoneNumber}>{formatedPhoneNumber ? formatedPhoneNumber : <EmptyDataText />}</span>
            </td>
            <td><StudentStatus status={status} /></td>
            <td onClick={(e) => (e.stopPropagation())}>
                <TableActionButton menuItems={dropdownMenuItems} />
            </td>
        </tr>
    );
}

export default StudentsTableRow;