import { useState } from 'react';
import Avatar from '../../atoms/Avatar';
import { ReplaceIcon } from '../../atoms/icons';
import TableActionButton from '../../moleculs/TableActionButton';
import ChangeSalesLeaderFormModal from '../ChangeSalesLeaderFormModal';
import cls from './SalesTeamLeaderCard.module.scss';

const SalesTeamLeaderCard = ({
    avatar = '',
    groupId = '',
    fullName = '',
    onClickDetails,
    onClickChangePassword
}) => {
    const [isOpenChangeLeaderModal, setIsOpenChangeLeaderModal] = useState(false)

    return (
        <>
            <ChangeSalesLeaderFormModal 
                groupId={groupId}
                isOpen={isOpenChangeLeaderModal}
                onClose={() => setIsOpenChangeLeaderModal(false)}
            />
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
                    <button onClick={() => setIsOpenChangeLeaderModal(true)}><ReplaceIcon /></button>
                    <TableActionButton menuItems={[
                        { label: 'Shaxsiy ma’lumotlari', onClick: onClickDetails },
                        { label: 'Parol o’zgartirish', onClick: onClickChangePassword }
                    ]} />
                </div>
            </div>
        </>
    );
}

export default SalesTeamLeaderCard;