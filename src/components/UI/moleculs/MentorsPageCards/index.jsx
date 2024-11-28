import { formatNumber } from '@/utils/formatNumber';
import MentorsPageCard from '../../atoms/MentorsPageCard';
import cls from './MentorsPageCards.module.scss';

const backgroundColors = ["#4278E2", "rgba(0, 199, 89, 0.8)", "rgba(239, 183, 0, 0.8)", "rgba(255, 144, 102, 1)"];


const MentorsPageCards = ({
    teachersCount = 0,
    activityStudent = 0,
    salary = 0,
    reytings = 0
}) => {
  

    return (
    <div className={cls.cards}>
        <MentorsPageCard title="Teacherlar soni" text={teachersCount} bgColor={backgroundColors[0]} />
        <MentorsPageCard title="O'quvchilar aktivligi" text={activityStudent + '%'} bgColor={backgroundColors[1]} />
        <MentorsPageCard title="O'rtacha oylik maoshi" text={formatNumber(salary)} bgColor={backgroundColors[2]} />
        <MentorsPageCard title="Darsning o'rtacha reytinggi" text={reytings} bgColor={backgroundColors[3]} />
    </div>)
}


export default MentorsPageCards;