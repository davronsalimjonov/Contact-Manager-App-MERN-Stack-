import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './NotificationTable.module.scss';
import NotificationTableRow from '@/components/UI/moleculs/NotificationTableRow';
import NotificationTableHeader from '@/components/UI/organisms/NotificationTableHeader';

const NotificationTable = ({
    notifications = [],
    triggerRef,
    isLoading
}) => {
    const currenPage = notifications?.meta?.currentPage;
    const limit = notifications?.meta?.itemsPerPage;

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {notifications.items?.length > 0 ? (
                <table className={cls.table}>
                    <NotificationTableHeader />
                    <tbody>
                        <Mapper
                            data={notifications.items}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(notification, index) => (
                                <NotificationTableRow
                                    key={notification?.user?.id}
                                    index={(currenPage - 1) * limit + index + 1}
                                    name={notification?.status}
                                    sendDate={notification?.startDate}
                                    sendingType={"auto"}
                                    updateDate={notification?.endDate}
                                />
                            )}
                        />
                        <tr ref={triggerRef}></tr>
                    </tbody>
                </table>
            ) : (
                !isLoading && <EmptyData text="Sizda hozirda bunday o'quvchi mavjud emas." />
            )}
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default NotificationTable;