import { MENTOR_CARDS_ENUM } from '@/constants/enum';
import { GreenCardIcon, RedCardIcon, YellowCardIcon } from '../../atoms/icons';
import MentorCardTooltip from '../../moleculs/MentorCardTooltip';
import cls from './MentorCard.module.scss';

const MentorCards = ({
    cards = []
}) => {
    return cards?.length > 0 ? (
        <div className={cls.cards}>
            {cards?.map((card, index) => (
                <MentorCardTooltip
                    key={index}
                    type={card.type}
                    amount={card.amount}
                    description={card.description}
                >
                    {card.type === MENTOR_CARDS_ENUM.BONUS && <GreenCardIcon width={32} height={32} />}
                    {card.type === MENTOR_CARDS_ENUM.WARNING && <YellowCardIcon width={32} height={32} />}
                    {card.type === MENTOR_CARDS_ENUM.FINE && <RedCardIcon width={32} height={32} />}
                </MentorCardTooltip>
            ))}
        </div>
    ) : null
}

export default MentorCards;