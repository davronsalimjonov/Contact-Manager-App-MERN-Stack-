import dayjs from 'dayjs';
import Avatar from 'react-avatar';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import EmptyDataText from '../../atoms/EmptyDataText';
import UserStatusBadge from '../../atoms/UserStatusBadge';
import TableActionButton from '../TableActionButton';
import cls from './UsersTableRow.module.scss';

const UsersTableRow = ({
    index = 0,
    avatar = '',
    fullName = '',
    phoneNumber = '',
    status = '',
    uniqueId = '',
    createdAt = '',
    onClickUserInfo
}) => {
    const formatedPhoneNumber = formatPhoneNumberIntl(phoneNumber)

    const actionButtons = [
        {label: 'Foydalanuvchi ma\'lumotlari', onClick: onClickUserInfo}
    ]

    return (
        <tr className={cls.row}>
            <td>{index}</td>
            <td className={cls.row__name}>
                <Avatar round size={32} src={avatar} name={fullName} />
                <span title={fullName}>{fullName}</span>
            </td>
            <td>
                <span title={formatedPhoneNumber}>{formatedPhoneNumber}</span>
            </td>
            <td className={cls.row__status}><UserStatusBadge status={status} /></td>
            <td>{uniqueId}</td>
            <td><span title={createdAt}>{createdAt ? dayjs(createdAt).format('DD.MM.YYYY HH:mm') : <EmptyDataText />}</span></td>
            <td><TableActionButton menuItems={actionButtons} /></td>
        </tr>
    );
}

export default UsersTableRow;