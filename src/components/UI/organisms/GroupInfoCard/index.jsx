import Avatar from 'react-avatar';
import Button from '../../atoms/Buttons/Button';
import { ArrowRightIcon, PersonsGroupIcon } from '../../atoms/icons';
import cls from './GroupInfoCard.module.scss';

const GroupInfoCard = ({
    title,
    hasSchedule,
    mainMentorFullName,
    mainMentorAvatar,
    callMentorFullName,
    callMentorAvatar,
    onClickCreateSchedule
}) => {
    return (
        <div className={cls.card}>
            <div className={cls.card__header}>
                <PersonsGroupIcon />
                <span className={cls.card__header__title}>{title} guruh</span>
            </div>
            {hasSchedule ? (
                <Button onClick={onClickCreateSchedule} className={cls.card__outline}>Dars jadval <ArrowRightIcon /></Button>
            ) : (
                <Button onClick={onClickCreateSchedule}>Dars jadval yaratish</Button>
            )}
            <div className={cls.card__mentors}>
                <div className={cls.card__mentors__item}>
                    <Avatar
                        round
                        size='28'
                        name={mainMentorFullName}
                        src={mainMentorAvatar}
                        className={cls.card__mentors__item__avatar}
                    />
                    <span className={cls.card__mentors__item__role}>Asosiy mentor</span>
                    <span className={cls.card__mentors__item__name}>{mainMentorFullName}</span>
                </div>
                <div className={cls.card__mentors__item}>
                    <Avatar
                        round
                        size='28'
                        src={callMentorAvatar}
                        name={callMentorFullName}
                        className={cls.card__mentors__item__avatar}
                    />
                    <span className={cls.card__mentors__item__role}>Nazoratchi mentor</span>
                    <span className={cls.card__mentors__item__name}>{callMentorFullName}</span>
                </div>
            </div>
        </div>
    );
}

export default GroupInfoCard;