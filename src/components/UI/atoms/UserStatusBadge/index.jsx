import { cn } from '@/utils/lib';
import { USER_TYPE_ENUMS } from '@/constants/enum';
import cls from './UserStatusBadge.module.scss';

const UserStatusBadge = ({ status }) => {
    
    const getStatusLabelText = (status) => {
        switch (status) {
            case USER_TYPE_ENUMS.FREE: return 'Free';
            case USER_TYPE_ENUMS.STUDENT: return 'O\'quvchi';
            default: return status;
        }   
    }

    return (
        <div className={cn(cls.badge, status === USER_TYPE_ENUMS.STUDENT && cls.student)}>
            {getStatusLabelText(status)}
        </div>
    );
}

export default UserStatusBadge;