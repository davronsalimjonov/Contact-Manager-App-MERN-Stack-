import { getStatusColor, getStatusIcon, getStatusLabel } from '@/utils/workspace';
import cls from './ConnectionStatus.module.scss';

const ConnectionStatus = ({
    status = '',
    onClick
}) => {
    return (
        <div className={cls.status} onClick={onClick}>
            {getStatusIcon(status)}
            <span style={{color: getStatusColor(status)}}>
                {getStatusLabel(status)}
            </span>
        </div>
    );
}

export default ConnectionStatus;