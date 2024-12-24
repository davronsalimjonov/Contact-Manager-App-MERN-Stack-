import Avatar from 'react-avatar';
import cls from './MentorStatisticLeaderboardTableRow.module.scss';
import { FirstPlaceIcon, SecondPlaceIcon, ThirdPlaceIcon } from '../../atoms/icons';

const MentorsStatisticLeaderboardTableRow = ({
    index,
    avatar,
    mentor,
    avarageRate,
}) => {
    return (
        <tr className={cls.row}>
            <td>
                <span className={cls.row__cup}>
                    {index}.
                    {(index === 1) && <FirstPlaceIcon />}
                    {(index === 2) && <SecondPlaceIcon />}
                    {(index === 3) && <ThirdPlaceIcon />}
                </span>
            </td>
            <td>
                <Avatar round={true} size='40' name={mentor} src={avatar} />
                {mentor}
            </td>
            <td className={cls.row__td}><span className={cls.row__rate}>{avarageRate}</span></td>
        </tr>
    )
}

export default MentorsStatisticLeaderboardTableRow;