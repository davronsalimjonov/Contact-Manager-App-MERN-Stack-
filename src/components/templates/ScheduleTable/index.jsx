import { useNavigate } from 'react-router-dom';
import ScheduleTableHeader from '@/components/UI/organisms/ScheduleTableHeader';
import ScheduleTableRow from '@/components/UI/organisms/ScheduleTableRow';
import cls from './ScheduleTable.module.scss';

const ScheduleTable = () => {
    const navigate = useNavigate()

    return (
        <div className={cls.tableWrapper}>
            <table className={cls.ScheduleTable}>
                <ScheduleTableHeader />
                <tbody>
                    <ScheduleTableRow
                        onClick={() => navigate('homework/1')}
                    />
                </tbody>
            </table>
        </div>
    );
}

export default ScheduleTable;