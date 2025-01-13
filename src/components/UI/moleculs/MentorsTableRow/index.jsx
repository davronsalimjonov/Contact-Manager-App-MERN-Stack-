import { useNavigate } from 'react-router-dom';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import StudentStatus from '../../atoms/StudentStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import cls from './MentorsTableRow.module.scss';
import Avatar from 'react-avatar';
import { EditMentorIcon, PasswordLockIcon } from '../../atoms/icons';

const MentorsTableRow = ({
    index = 0,
    role = '',
    avatar = '',
    mentor = '',
    status = '',
    student = '',
    fullName = '',
    phoneNumber = '',
    degree = 'Kiritlmagan',
    setRole,
    setId
}) => {
    const navigate = useNavigate()
    const formatedPhoneNumber = formatPhoneNumberIntl(phoneNumber)
    
    return (
        <tr className={cls.row} onClick={() => {
            navigate(`/mentors/mentor/${mentor}?${role}`)
            setRole(role)
            setId(mentor)
        }}>
            <td>{index}</td>
            <td className={cls.row__name}>
                <div className={cls.row__notification}>
                    <Avatar
                        round
                        size={32}
                        src={`${avatar}`}
                        name={fullName}
                    />
                </div>
                <span title={fullName}>{fullName}</span>
            </td>

            <td>
                <span title={formatedPhoneNumber}>{formatedPhoneNumber ? formatedPhoneNumber : <EmptyDataText />}</span>
            </td>
            <td><StudentStatus status={degree} /></td>
            <td><StudentStatus status={status} /></td>
            <td><span>{student}</span></td>
            <td onClick={(e) => (e.stopPropagation())}>
                <div>
                    <EditMentorIcon />
                </div>
            </td>
        </tr>
    );
}

export default MentorsTableRow;