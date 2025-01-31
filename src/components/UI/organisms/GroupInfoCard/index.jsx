import Avatar from 'react-avatar';
import Button from '../../atoms/Buttons/Button';
import { PersonsGroupIcon } from '../../atoms/icons';
import cls from './GroupInfoCard.module.scss';

const GroupInfoCard = () => {
    return (
        <div className={cls.card}>
            <div className={cls.card__header}>
                <PersonsGroupIcon />
                <span className={cls.card__header__title}>A1/11 guruh</span>
            </div>
            <Button>Dars jadval yaratish</Button>
            <div className={cls.card__mentors}>
                <div className={cls.card__mentors__item}>
                    <Avatar
                        className={cls.card__mentors__item__avatar} 
                        round={true} 
                        size='28' 
                        name='Mahliyo Sohibjonova' 
                    />
                    <span className={cls.card__mentors__item__role}>Asosiy mentor</span>
                    <span className={cls.card__mentors__item__name}>Mahliyo Sohibjonova</span>
                </div>
                <div className={cls.card__mentors__item}>
                    <Avatar
                        className={cls.card__mentors__item__avatar} 
                        round={true} 
                        size='28' 
                        name='Mahliyo Sohibjonova' 
                    />
                    <span className={cls.card__mentors__item__role}>Asosiy mentor</span>
                    <span className={cls.card__mentors__item__name}>Mahliyo Sohibjonova</span>
                </div> 
            </div>
        </div>
    );
}

export default GroupInfoCard;