import { useState } from 'react';
import { useGetUsers } from '@/hooks/useUsers';
import Loader from '@/components/UI/atoms/Loader';
import { USER_TYPE_ENUMS } from '@/constants/enum';
import UsersTable from '@/components/templates/UsersTable';
import UsersSearchBar from '@/components/UI/organisms/UsersSearchBar';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import useSessionState from '@/hooks/useSessionState';
import cls from './Users.module.scss';

const Users = () => {
    const [filter, setFilter] = useSessionState('users-filter', {})
    const [pagination, setPagination] = useSessionState('users-pagination', { page: 0, limit: 10 });
    const { data: allUsers, isLoading: isLoadingAllUsers } = useGetUsers({ ...filter, page: pagination.page + 1, limit: pagination.limit })

    const handleChangeFilter = (value) => {
        setFilter(value);
        setPagination(state => ({ ...state, page: 0 }));
    }

    return (
        <div className={cls.page}>
            <UsersSearchBar onChange={handleChangeFilter} defaultValue={filter} />
            {!isLoadingAllUsers ? (
                <UsersTable
                    students={allUsers?.items}
                    startIndex={pagination.page * pagination.limit}
                />
            ) : (
                <Loader />
            )}
            <Pagination
                initialPage={pagination.page}
                pageCount={allUsers?.meta?.totalPages}
                page={pagination.page}
                onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
            />
        </div>
    );
}

export default Users;