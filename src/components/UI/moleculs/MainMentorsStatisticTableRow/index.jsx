import { formatPrice } from '@/utils/lib';
import { StarIcon } from '../../atoms/icons';
import cls from './MainMentorsStatisticTableRow.module.scss';

const MainMentorsStatisticTableRow = ({
    index = 0,
    fullName = '',
    activeStudentsPercentage = 0,
    activeStudentsCount = 0,
    mentorActivityPercentage = 0,
    salary = '',
    rating = 0,
    onClick
}) => {
    return (
        <tr className={cls.row} onClick={onClick}>
            <td>{index}</td>
            <td>{fullName}</td>
            <td>{activeStudentsPercentage} %</td>
            <td>{activeStudentsCount} ta</td>
            <td>{mentorActivityPercentage} %</td>
            <td>{formatPrice(salary)} so'm</td>
            <td><StarIcon begining={rating * 20} />{rating}</td>
        </tr>
    );
}

export default MainMentorsStatisticTableRow;