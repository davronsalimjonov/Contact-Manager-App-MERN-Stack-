import { EMPLOYEE_STATUS_COLORS } from '@/constants/colors';
import cls from './EmployeeStatusBadge.module.scss';

const EmployeeStatusBadge = ({ status = '' }) => {
    return (
        <div
            className={cls.badge}
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