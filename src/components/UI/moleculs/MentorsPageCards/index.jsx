import { formatNumber } from '@/utils/formatNumber';
import MentorsPageCard from '../../atoms/MentorsPageCard';
import cls from './MentorsPageCards.module.scss';

const backgroundColors = ["#4278E2", "rgba(0, 199, 89, 0.8)", "rgba(239, 183, 0, 0.8)", "rgba(255, 144, 102, 1)"];


const MentorsPageCards = ({ cards }) => {
    return (
        <div className={cls.cards}>
            {
                cards?.map((card, index) => (<MentorsPageCard title={card.title} text={card.text} bgColor={backgroundColors[index]} />))
            }
        </div>)
}


export default MentorsPageCards;