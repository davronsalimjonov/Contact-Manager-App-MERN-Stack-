import cls from './ScheduleTable.module.scss';
import ScheduleTableHeader from '@/components/UI/organisms/ScheduleTableHeader';
import ScheduleTableRow from '@/components/UI/organisms/ScheduleTableRow';

const ScheduleTable = () => {
    return (
        <div className={cls.tableWrapper}>
            <table className={cls.ScheduleTable}>
                <ScheduleTableHeader />
                <tbody>
                    <ScheduleTableRow />
                </tbody>
            </table>
        </div>
    );
}

export default ScheduleTable;