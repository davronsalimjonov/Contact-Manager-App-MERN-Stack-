import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@/components/UI/atoms/icons';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './MentorLessonStatisticsTable.module.scss';

const MentorLessonStatisticsTable = ({ items = [] }) => {
    const navigate = useNavigate()

    return items?.length > 0 ? (
        <table className={cls.table}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Dars o’tgan mentor ismi</th>
                    <th>Baholagan o’quvchi soni</th>
                    <th>Guruhi</th>
                    <th>Dars o’rtacha statistikasi</th>
                </tr>
            </thead>
            <tbody>
                {items?.map((item, index) => {
                    const fullName =  `${item?.firstname} ${item?.lastname}`?.trim()
                    return (
                        <tr
                            key={item?.groupid}
                            className={cls.row}
                            onClick={() => navigate(`${item?.mentorid}/${item?.groupid}`)}
                        >
                            <td>{index + 1}</td>
                            <td className={cls.row__name}>
                                <Avatar name={fullName} src={item?.url} size={24} round /> {fullName}
                            </td>
                            <td>{item?.ratecount}</td>
                            <td>{item?.grouptitle}</td>
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

export default MentorLessonStatisticsTable;