
import cls from './Notification.module.scss';
import { useState } from 'react';
import { Pagination } from 'antd';
import { useGetNotification } from '@/hooks/useGetNotification';
import NotificationTable from '@/components/templates/NotificationTable';
import Button from '@/components/UI/atoms/Buttons/Button';
import { PlusIcon } from '@/components/UI/atoms/icons';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const navigate=useNavigate();
    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
    }
    );
    // TODO
    const { ref, data: notifications, isLoading: isLoadingNotifications } = useGetNotification('notification', filter);
    const onShowSizeChange = (current, pageSize) => {
        setFilter((prev) => {
            return {
                ...prev,
                page: current,
                limit: pageSize,
            }
        })
    };

    return (
        <div className={cls.page}>
            <Button className={cls.page__btn} onClick={()=>navigate('/notifications/add')} type='button'><PlusIcon />Eslatmalar qo’shish</Button>
            <div className={cls.content}>
                <h2 className={cls.content__haeder}>Eslatmalar</h2>
                <NotificationTable
                    triggerRef={ref}
                    notifications={notifications}
                    isLoading={isLoadingNotifications}
                />
            </div>

            {
                (notifications?.meta?.totalItems > filter.limit) && <div className={cls.pagination}>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        defaultCurrent={filter.page}
                        defaultPageSize={filter.limit}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} notifications`}
                        onChange={(page) => {
                            setFilter((prev) => {
                                return {
                                    ...prev,
                                    page: page,
                                }
                            })
                        }}
                        total={notifications?.meta?.totalItems}
                    />
                </div>
            }
        </div>
    )
}

export default Notification;