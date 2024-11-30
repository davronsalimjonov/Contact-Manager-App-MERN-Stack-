import { formatNumber } from '@/utils/formatNumber';
import { StarIcon } from '../../atoms/icons';
import cls from './CallMentorsTableRow.module.scss';
import { formatTime } from '@/utils/formatTime';
import { useNavigate } from 'react-router-dom';

const CallMentorsTableRow = ({
    mentorId="",
    index = 0,
    mentor = '',
    callCount = '',
    callDuration = '',
    salary = '',
    taskSpeed = 0,
    callRate = 0
}) => {
const navigate = useNavigate();


    return (
        <tr className={cls.row} onClick={() => navigate(`/call-teachers/${mentorId}`)}>
            <td>{index}</td>
            <td>{mentor}</td>
            <td>{callCount}</td>
            <td>{formatTime(callDuration) + ' s'}</td>
            <td>
                {formatNumber(salary)}
            </td>
            <td>{formatTime(taskSpeed) + 's'}</td>
            <td><StarIcon begining={callRate * 20} />{callRate}</td>
        </tr>
    );
}

export default CallMentorsTableRow;