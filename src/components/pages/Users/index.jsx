import { useState } from 'react';
import { useGetUsers } from '@/hooks/useUsers';
import Loader from '@/components/UI/atoms/Loader';
import { USER_TYPE_ENUMS } from '@/constants/enum';
import UsersTable from '@/components/templates/UsersTable';
import UsersSearchBar from '@/components/UI/organisms/UsersSearchBar';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import cls from './Users.module.scss';

const Users = () => {
    const [filter, setFilter] = useState({})
    const [pagination, setPagination] = useState({ page: 0, limit: 10 });
    const { data: allUsers, isLoading: isLoadingAllUsers } = useGetUsers({ ...filter, page: pagination.page + 1, limit: pagination.limit })

    const handleChangeFilter = (key, value) => {
        setFilter(state => ({ ...state, [key]: value }));
        setPagination(state => ({ ...state, page: 0 }));
    }

    return (
        <div className={cls.page}>
            <UsersSearchBar
                onChangeFirstName={e => handleChangeFilter('firstName', e.target.value?.trim())}
                onChangeLastName={e => handleChangeFilter('lastName', e.target.value?.trim())}
                onChangePhone={phone => handleChangeFilter('phone', phone)}
                onChangeStatus={type => handleChangeFilter('isPro', type?.value ? type?.value === USER_TYPE_ENUMS.STUDENT : '')}
            />
            {!isLoadingAllUsers ? (
                <UsersTable
                    students={allUsers?.items}
                    startIndex={pagination.page * pagination.limit}
                />
            ) : (
                <Loader />
            )}
            <Pagination
                pageCount={allUsers?.meta?.totalPages}
                page={pagination.page}
                onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
            />
        </div>
    );
}

export default Users;