import { CallIcon } from '../../atoms/icons';
import cls from './WorkspaceCard.module.scss';

const WorkspaceCard = () => {
    return (
        <div className={cls.card}>
            <h4 className={cls.card__name}>Diyora Shomamatova</h4>
            <span className={cls.card__group}>A1 guruh</span>
            <div className={cls.card__action}>
                <button className={cls.card__action__btn}>
                    <CallIcon />
                    <span>Bog’lanish</span>
                </button>
                <span className={cls.card__action__time}>10:04</span>
            </div>
        </div>
    );
}

export default WorkspaceCard;