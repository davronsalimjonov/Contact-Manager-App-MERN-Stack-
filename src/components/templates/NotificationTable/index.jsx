import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './NotificationTable.module.scss';
import NotificationTableRow from '@/components/UI/moleculs/NotificationTableRow';
import NotificationTableHeader from '@/components/UI/organisms/NotificationTableHeader';
import Dialog from '@/components/UI/moleculs/Dialog';
import Button from '@/components/UI/atoms/Buttons/Button';
import { useState } from 'react';
import { deleteNotification } from '@/services/notification';
import { notification } from 'antd';
import RedButton from '@/components/UI/atoms/Buttons/RedButton';
import { customToast } from '@/utils/toast';
import toast from 'react-hot-toast';
import { queryClient } from '@/services/api';

const NotificationTable = ({
    notifications = [],
    triggerRef,
    isLoading
}) => {
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const currenPage = notifications?.meta?.currentPage;
    const limit = notifications?.meta?.itemsPerPage;

    const handleOpenDialog = (id) => {
        setOpen(true);
        setCurrentId(id);
    }

    const handleCloseDialog = () => {
        setOpen(false);
        setCurrentId(null);
    }

    const handleDeleteNotification = async () => {
        try {
            const deletedWord = await deleteNotification(currentId)
            toast.success("Eslatma o'chirildi");

            queryClient.setQueriesData(['notification', 'notification', { page: currenPage, limit: limit }], oldData => {
                return {
                    ...oldData,
                    items: oldData?.items?.filter(notification => {
                        if (notification.id !== currentId) return notification;
                    })
                }
            });
            
            handleCloseDialog();

        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')

        }
    }


    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Dialog isOpen={open} onClose={() => setOpen(false)}>
                <div className={cls.dialog}>
                    <p className={cls.dialog__text}>Ushbu eslatmani o'chirishni xohlaysizmi?</p>
                    <div className={cls.dialog__buttons}>
                        <Button onClick={handleDeleteNotification} type='button'>Ha</Button>
                        <RedButton onClick={handleCloseDialog} type='button'>Yo'q</RedButton>
                    </div>
                </div>
            </Dialog>
            {notifications?.items?.length > 0 ? (
                <table className={cls.table}>
                    <NotificationTableHeader />
                    <tbody>
                        <Mapper
                            data={notifications?.items}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(notification, index) => (
                                <NotificationTableRow
                                    key={notification?.id}
                                    id={notification?.id}
                                    index={(currenPage - 1) * limit + index + 1}
                                    description={notification?.description}
                                    time={notification?.time}
                                    date={notification?.date}
                                    login={notification?.conditionWeb?.login}
                                    isAuto={notification?.isAuto}
                                    handleDelete={handleOpenDialog}
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