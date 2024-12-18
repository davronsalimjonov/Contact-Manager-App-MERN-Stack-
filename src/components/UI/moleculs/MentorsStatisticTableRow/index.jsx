import Avatar from 'react-avatar';
import cls from './MentorsStatisticTableRow.module.scss';
import { StarIcon } from '../../atoms/icons';

const MentorsStatisticTableRow = ({
    index,
    avatar,
    mentor,
    countStudents,
    activity,
    avarageRate,
    monthlyCall,
    dailyCall,
}) => {
    return (
        <tr className={cls.row}>
            <td className={cls.row__avatar}>
                {index}.
            </td>
            <td>
                <Avatar round={true} size='40' name={mentor} src={avatar} />
                {mentor}
            </td>
            {countStudents && <td>{countStudents}</td>}
            {activity && <td>{activity}</td>}
            {monthlyCall && <td>{monthlyCall}</td>}
            {dailyCall && <td>{dailyCall}</td>}
            <td><span className={cls.row__rate}><StarIcon begining={avarageRate * 20} />{avarageRate}</span></td>
        </tr>
    )
}

export default MentorsStatisticTableRow;