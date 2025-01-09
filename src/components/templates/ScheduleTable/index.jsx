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
            {schedule?.length > 0 ? (
                <table className={cls.table}>
                       <caption className={cls.table__caption}>Dars jadvali</caption>
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
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default ScheduleTable;