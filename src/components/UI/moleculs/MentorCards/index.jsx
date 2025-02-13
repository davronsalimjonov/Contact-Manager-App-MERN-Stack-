import { RedCardIcon } from '../../atoms/icons';
import MentorCardTooltip from '../../moleculs/MentorCardTooltip';
import cls from './MentorCard.module.scss';

const MentorCard = () => {
    return (
        <div className={cls.card}>
            <MentorCardTooltip 
                type='red'
                amount={50000}
                description='Kartochka'
            >
                <RedCardIcon width={32} height={32} />
            </MentorCardTooltip>
        </div>
    );
}

export default MentorCard;