import Avatar from 'react-avatar';
import cls from './MentorsStatisticTableRow.module.scss';
import {FirstPlaceIcon, SecondPlaceIcon, StarIcon, ThirdPlaceIcon } from '../../atoms/icons';

const MentorsStatisticTableRow = ({
    index,
    avatar,
    mentor,
    // countStudents,
    activity,
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
            {/* <td>{countStudents}</td> */}
            <td>{activity}</td>
            <td><span className={cls.row__rate}><StarIcon begining={avarageRate * 20} />{avarageRate}</span></td>
        </tr>
    )
}

export default MentorsStatisticTableRow;