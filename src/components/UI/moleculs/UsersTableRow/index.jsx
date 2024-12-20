import { useNavigate } from 'react-router-dom';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import StudentStatus from '../../atoms/StudentStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import TableActionButton from '../TableActionButton';
import cls from './UsersTableRow.module.scss';
import Avatar from 'react-avatar';
import dayjs from 'dayjs';

const UsersTableRow = ({
    index = 0,
    avatar = '',
    status = '',
    student = '',
    fullName = '',
    phoneNumber = '',
    uniqueId = '',
    createdAt = '',
    hidden = false,
    unreadedMessagesCount = 0
}) => {
    const navigate = useNavigate()
    const formatedPhoneNumber = formatPhoneNumberIntl(phoneNumber)

    const dropdownMenuItems = [
        { label: 'Foydalanuvchi ma’lumotlari', onClick: () => navigate(`/users/user/${student}`) },
    ]

    return (
        <tr className={cls.row} onClick={() => navigate(`/users/user/${student}`)}>
            <td>{index}</td>
            <td className={cls.row__name}>
                <div className={cls.row__notification}>
                    <Avatar
                        round
                        size={32}
                        src={`${avatar}`}
                        name={fullName}
                    />
                    {unreadedMessagesCount > 0 && <span className={cls.row__notification__badge}>{unreadedMessagesCount}</span>}
                </div>
                <span title={fullName}>{fullName}</span>
            </td>
            <td>
                <span title={formatedPhoneNumber}>{formatedPhoneNumber ? formatedPhoneNumber : <EmptyDataText />}</span>
            </td>
            <td><StudentStatus status={status} /></td>
            <td><StudentStatus status={uniqueId} /></td>
            <td className={`${hidden ? cls.hidden : ""} ${cls.someOtherClass}`.trim()}><span title={createdAt}>{createdAt ? dayjs(createdAt).format('DD.MM.YYYY HH:mm') : <EmptyDataText />}</span></td>
            <td onClick={(e) => (e.stopPropagation())}>
                <TableActionButton menuItems={dropdownMenuItems} />
            </td>
        </tr>
    );
}

export default UsersTableRow;