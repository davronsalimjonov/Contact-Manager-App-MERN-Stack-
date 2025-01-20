import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './ScheduleTable.module.scss';
import ScheduleTableHeader from '@/components/UI/organisms/ScheduleTableHeader';
import ScheduleTableRow from '@/components/UI/organisms/ScheduleTableRow';

const ScheduleTable = ({
    schedule = [],
    triggerRef,
    isLoading
}) => {
    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div className={cls.scheduleTableParent}>
                <h1 className={cls.__caption}>Dars jadvali</h1>
                {schedule?.length > 0 ? (
                    <table className={cls.table}>
                        <ScheduleTableHeader />
                        <tbody>
                            <Mapper
                                data={schedule}
                                isInfinityQuery
                                isLoading={isLoading}
                                renderItem={(scheduleItem, index) => (
                                    <ScheduleTableRow
                                        key={scheduleItem?.id}
                                        scheduleId={scheduleItem?.id}
                                        lvl={scheduleItem?.group?.title}
                                        date={scheduleItem?.weekday}
                                        time={`${scheduleItem?.time}/${scheduleItem?.endTime}`}
                                    />
                                )}
                            />
                            <tr ref={triggerRef}></tr>
                        </tbody>
                    </table>
                ) : (
                    !isLoading && <EmptyData />
                )}
            </div>
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default ScheduleTable;