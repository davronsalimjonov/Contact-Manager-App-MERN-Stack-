import cls from './ScheduleTable.module.scss';
import ScheduleTableHeader from '@/components/UI/organisms/ScheduleTableHeader';
import ScheduleTableRow from '@/components/UI/organisms/ScheduleTableRow';
import { useNavigate } from 'react-router-dom';

const ScheduleTable = () => {
    const navigate = useNavigate()

    return (
        <div className={cls.tableWrapper}>
            <table className={cls.ScheduleTable}>
                <ScheduleTableHeader />
                <tbody>
                    <ScheduleTableRow
                        onClick={() => navigate(`/schedule/homework/details`)}
                    />
                </tbody>
            </table>
        </div>
    );
}

export default ScheduleTable;