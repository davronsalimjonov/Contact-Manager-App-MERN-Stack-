import cls from './ScheduleTable.module.scss';
import ScheduleTableHeader from '@/components/UI/organisms/ScheduleTableHeader';
import ScheduleTableRow from '@/components/UI/organisms/ScheduleTableRow';

const ScheduleTable = () => {
    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div className={cls.scheduleTableParent}>
                <table className={cls.table}>
                    <ScheduleTableHeader />
                    <tbody>
                        <ScheduleTableRow />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ScheduleTable;