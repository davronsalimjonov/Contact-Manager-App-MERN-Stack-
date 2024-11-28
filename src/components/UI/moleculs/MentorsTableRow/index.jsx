import EmptyDataText from '../../atoms/EmptyDataText';
import cls from './MentorsTableRow.module.scss';
import { formatTime } from '@/utils/formatTime';

const MentorsTableRow = ({
    index = 0,
    mentor = '',
    activityStudents = '',
    salary = '',
    speed = '',
    reyting = 0
}) => {

    return (
        <tr className={cls.row}>
            <td>{index}</td>
            <td>{mentor}</td>
            <td>{activityStudents}</td>
            <td>{salary}</td>
            <td>
                {formatTime(speed)+' s'}
            </td>
            <td>{reyting}</td>
        </tr>
    );
}

export default MentorsTableRow;