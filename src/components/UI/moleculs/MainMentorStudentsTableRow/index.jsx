import { useNavigate } from 'react-router-dom';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import StudentStatus from '../../atoms/StudentStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import TableActionButton from '../TableActionButton';
import cls from './MainMentorStudentsTableRow.module.scss';
import Avatar from 'react-avatar';

const MainMentorStudentsTableRow = ({
    index = 0,
    group = '',
    setIsModal,
    avatar = '',
    status = '',
    setCourseId,
    setIsTransfer,
    fullName = '',
    setPasswordModal,
    phoneNumber = '',
    userCourseId = '',
}) => {
    const navigate = useNavigate()
    const formatedPhoneNumber = formatPhoneNumberIntl(phoneNumber)

    const dropdownMenuItems = [
        { label: 'O’quvchi ma’lumotlari', onClick: () => navigate(`/students/${userCourseId}`) },
        { label: 'Transfer Student', onClick: () => {
            setIsTransfer(true)
            setIsModal(true)
        }},
        { label: "O'quvchi Parolini O'zgartirish", onClick: () => setPasswordModal(true)}
    ]

    setCourseId(userCourseId)

    return (
        <tr className={cls.row} key={`mainMentorStudentsTable-${userCourseId}`}>
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
                <span title={group}>{group}</span>
            </td>
            <td><StudentStatus status={status} /></td>
            <td onClick={(e) => (e.stopPropagation())}>
                <TableActionButton menuItems={dropdownMenuItems} />
            </td>
        </tr>
    );
}

export default MainMentorStudentsTableRow;