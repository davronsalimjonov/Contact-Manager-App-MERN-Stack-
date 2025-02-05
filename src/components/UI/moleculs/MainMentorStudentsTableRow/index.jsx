import Avatar from 'react-avatar';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import StudentStatus from '../../atoms/StudentStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import TableActionButton from '../TableActionButton';
import cls from './MainMentorStudentsTableRow.module.scss';

const MainMentorStudentsTableRow = ({
    index = 0,
    group = '',
    avatar = '',
    status = '',
    fullName = '',
    phoneNumber = '',
    onClickTransfer,
    onClickChangePassword,
    onClickStudentInfo
}) => {
    const formatedPhoneNumber = formatPhoneNumberIntl(phoneNumber)

    const dropdownMenuItems = [
        { label: 'O’quvchi ma’lumotlari', onClick: onClickStudentInfo },
        { label: 'Transfer Student', onClick: onClickTransfer },
        { label: "O'quvchi Parolini O'zgartirish", onClick: onClickChangePassword }
    ]

    return (
        <tr className={cls.row}>
            <td>{index}</td>
            <td className={cls.row__name}>
                <div className={cls.row__notification}>
                    <Avatar
                        round
                        size={32}
                        src={avatar}
                        name={fullName}
                    />
                </div>
                <span title={fullName}>{fullName}</span>
            </td>
            <td>
                <span title={formatedPhoneNumber}>{formatedPhoneNumber ? formatedPhoneNumber : <EmptyDataText />}</span>
            </td>
            <td>
                <span title={group}>{group || <EmptyDataText />}</span>
            </td>
            <td><StudentStatus status={status} /></td>
            <td>
                <TableActionButton menuItems={dropdownMenuItems} />
            </td>
        </tr>
    );
}

export default MainMentorStudentsTableRow;