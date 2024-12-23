import ConnectionStatus from '../../atoms/ConnectionStatus';
import EmptyDataText from '../../atoms/EmptyDataText';
import cls from './WorkspaceCallCard.module.scss';

const WorkspaceCallCard = ({
    fullName = '',
    group = '',
    status = '',
    time = '',
    onClickCall
}) => {
    return (
        <div className={cls.card}>
            <h4 className={cls.card__name}>{fullName}</h4>
            <span className={cls.card__group}>{group ? `${group} guruh` : <EmptyDataText />}</span>
            <div className={cls.card__action}>
                <ConnectionStatus status={status} onClick={onClickCall} />
                <span className={cls.card__action__time}>{time}</span>
            </div>
        </div>
    );
}

export default WorkspaceCallCard;