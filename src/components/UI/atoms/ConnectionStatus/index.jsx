import { getStatusColor, getStatusIcon, getStatusLabel } from '@/utils/workspace';
import cls from './ConnectionStatus.module.scss';

const ConnectionStatus = ({
    status = ''
}) => {
    return (
        <div className={cls.status}>
            {getStatusIcon(status)}
            <span style={{color: getStatusColor(status)}}>
                {getStatusLabel(status)}
            </span>
        </div>
    );
}

export default ConnectionStatus;