import { formatNumber } from '@/utils/formatNumber';
import EmptyDataText from '../../atoms/EmptyDataText';
import { StarIcon } from '../../atoms/icons';
import cls from './MentorsTableRow.module.scss';
import { formatTime } from '@/utils/formatTime';
import { useNavigate } from 'react-router-dom';

const MainMentorsTableRow = ({
    mentorId,
    index = 0,
    mentor = '',
    activityStudents = '',
    salary = '',
    speed = '',
    reyting = 0
}) => {
    const navigate = useNavigate();


    return (
        <tr className={cls.row} onClick={() => navigate(`/main-teachers/${mentorId}`)}>
            <td>{index}</td>
            <td>{mentor}</td>
            <td>{activityStudents}</td>
            <td>{formatNumber(salary)}</td>
            <td>
                {speed}
            </td>
            <td><StarIcon begining={reyting * 20} />{reyting}</td>
        </tr>
    );
}

export default MainMentorsTableRow;