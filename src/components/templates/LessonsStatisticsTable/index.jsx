import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@/components/UI/atoms/icons';
import cls from './LessonsStatisticsTable.module.scss';
import EmptyData from '@/components/UI/organisms/EmptyData';

const LessonsStatisticsTable = ({ items = [] }) => {
    const navigate = useNavigate()

    return items?.length > 0 ? (
        <table className={cls.table}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Mavzu</th>
                    <th>Dars sanasi</th>
                    <th>Baholagan o'quvchilar soni</th>
                    <th>O’quvchilar baholari</th>
                </tr>
            </thead>
            <tbody>
                {items?.map((item, index) => {
                    const fullName = `${item?.firstname} ${item?.lastname}`?.trim()
                    return (
                        <tr
                            key={item?.lessonid} 
                            className={cls.row} 
                            onClick={() => navigate(item?.lessonid)}
                        >
                            <td>{index + 1}</td>
                            <td className={cls.row__name}>{fullName}</td>
                            <td>{format(item?.lessondate, 'dd.MM.yyyy')}</td>
                            <td>{item?.ratecount}</td>
                            <td className={cls.row__stars}><StarIcon begining={100} /> {item?.averagerate}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    ) : (
        <EmptyData />
    )
}

export default LessonsStatisticsTable;