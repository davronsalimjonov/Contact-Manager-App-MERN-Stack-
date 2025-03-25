import { onImageError } from '@/utils/lib';
import { ReplaceIcon } from '../../atoms/icons';
import TableActionButton from '../../moleculs/TableActionButton';
import cls from './SalesTeamLeaderCard.module.scss';
import Avatar from '../../atoms/Avatar';

const SalesTeamLeaderCard = ({
    fullName = '',
    avatar = '',
    onClickDetails,
    onClickChangePassword
}) => {
    return (
        <div className={cls.card}>
            <Avatar 
                name={fullName}
                src={avatar}
                size={48}
            />
            <div className={cls.card__info}>
                <h3 className={cls.card__info__title}>{fullName}</h3>
                <span className={cls.card__info__role}>Guruh sardori</span>
            </div>
            <div className={cls.card__controls}>
                <button><ReplaceIcon /></button>
                <TableActionButton menuItems={[
                    { label: 'Shaxsiy ma’lumotlari', onClick: onClickDetails },
                    { label: 'Parol o’zgartirish', onClick: onClickChangePassword }
                ]} />
            </div>
        </div>
    );
}

export default SalesTeamLeaderCard;