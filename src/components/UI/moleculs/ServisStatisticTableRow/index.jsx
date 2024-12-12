import Avatar from 'react-avatar';
import cls from './ServisStatisticTableRow.module.scss';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '../../atoms/icons';

const ServisStatisticTableRow = ({
    groupId,
    teacherId,
    index,
    avatar,
    mentor,
    group,
    avarageRate,
    activeTab
}) => {
    const navigate = useNavigate();

    return (
        <tr className={cls.row} onClick={() => navigate(activeTab==='lesson'?`/service-statistics/lesson-rate/${teacherId}/${groupId}`:`/service-statistics/call-rate/${teacherId}`)}>
            <td className={cls.row__avatar}>
                {index}.
                <Avatar round={true} size='40' name={mentor} src={avatar} />
                {mentor}

            </td>
            {group && <td>{group}</td>}
            <td><span className={cls.row__rate}><StarIcon begining={avarageRate * 20} />{avarageRate}</span></td>

        </tr>
    )
}

export default ServisStatisticTableRow;