import { STATUS_COLORS } from '@/constants/colors';
import cls from './StudentStatus.module.scss';

const StudentStatus = ({
    status = ''
}) => {

    return (
        <span
            className={cls.status}
            style={{
                color: STATUS_COLORS[status]?.color || '#0F172A',
                backgroundColor: STATUS_COLORS[status]?.backgroundColor || '#74708E26'
            }}
        >
            {status}
        </span>
    );
}

export default StudentStatus;