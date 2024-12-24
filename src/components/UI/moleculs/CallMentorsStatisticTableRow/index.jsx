import Avatar from 'react-avatar';
import cls from './CallMentorsStatisticTableRow.module.scss';
import { FirstPlaceIcon, SecondPlaceIcon, StarIcon, ThirdPlaceIcon } from '../../atoms/icons';

const CallMentorsStatisticTableRow = ({
    index,
    mentor,
    avatar,
    avarageRate,
    // countStudents,
    monthCall,
    dailyCall,
}) => {
    return (
        <tr className={cls.row}>
            <td>
                <span className={cls.row__cup}>
                {index}.
                {(index===1)&&<FirstPlaceIcon/>}
                {(index===2)&&<SecondPlaceIcon/>}
                {(index===3)&&<ThirdPlaceIcon/>}
                </span>
            </td>
            <td>
              
                <Avatar round={true} size='40' name={mentor} src={avatar} />
                {mentor}
            </td>
            {/* <td>{countStudents}</td>   */}
            <td>{monthCall}</td>
            <td>{dailyCall}</td>
            <td><span className={cls.row__rate}><StarIcon begining={avarageRate * 20} />{avarageRate}</span></td>
        </tr>
    )
}

export default CallMentorsStatisticTableRow;