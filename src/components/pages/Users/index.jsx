import { useState } from 'react';
import cls from './Users.module.scss';
import UsersTable from '@/components/templates/UsersTable';
import UsersSearchBar from '@/components/UI/organisms/UsersSearchBar';
import { useGetUsers } from '@/hooks/useGetUsers';
import Loader from '@/components/UI/atoms/Loader';
import Pagination from '@/components/UI/moleculs/Pagination';

const Users = () => {
    const [filter, setFilter] = useState({})
    const [modal, setModal] = useState(false)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });

    const handlePageChange = (page) => {
        setPagination((prev) => ({...prev, page }));
    };

    const handleLimitChange = (limit) => {
        setPagination((prev) => ({...prev, limit }));
    };

    const { ref, data: allUsers, isLoading: isLoadingAllUsers } = useGetUsers({...filter, ...pagination})

    return (
            <div className={cls.page}>
                <UsersSearchBar
                    onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                    onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                    onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
                    onChangeStatus={(isPro) => setFilter(state => ({ ...state, isPro: isPro?.value === "Pro" ? true : false  }))}
                    onChangeUniqueId={e => setFilter(state => ({ ...state, uniqueId: e.target.value?.trim()}))}
                    onChangeDate={createdAt => setFilter(state => ({ ... state, createdAt}))}
                />
            {(
                !isLoadingAllUsers
                ) ? (
                    <>
                        <UsersTable
                            triggerRef={ref}
                            students={allUsers?.items}
                            isLoading={isLoadingAllUsers}
                            isModal={modal}
                            setIsModal={setModal}
                        />
                        <Pagination
                            metaData={allUsers?.meta}
                            limit={pagination.limit}
                            setLimit={handleLimitChange}
                            page={pagination.page}
                            setPage={handlePageChange}
                        />
                        
                    </>
                ) : (
                    <Loader />
            )}
            </div>
    );
}

export default Users;