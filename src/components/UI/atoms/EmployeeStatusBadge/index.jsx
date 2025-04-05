import { EMPLOYEE_STATUS_COLORS } from '@/constants/colors';
import cls from './EmployeeStatusBadge.module.scss';
import { cn } from '@/utils/lib';

const EmployeeStatusBadge = ({ status = '', className }) => {
    return (
        <div
            className={cn(cls.badge, className)}
            style={{
                backgroundColor: EMPLOYEE_STATUS_COLORS[status]?.backgroundColor,
                color: EMPLOYEE_STATUS_COLORS[status]?.color
            }}
        >
            {status}
        </div>
    );
}

export default EmployeeStatusBadge;