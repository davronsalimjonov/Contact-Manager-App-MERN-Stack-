import { useState } from 'react';
import useGetGroups from '@/hooks/useGetGroups';
import cls from './Users.module.scss';
import UsersTable from '@/components/templates/UsersTable';
import UsersSearchBar from '@/components/UI/organisms/UsersSearchBar';
import { useGetUsers } from '@/hooks/useGetUsers';
import Loader from '@/components/UI/atoms/Loader';

const Users = () => {
    const { data: groups } = useGetGroups()
    const [filter, setFilter] = useState({})
    const { ref, data: allUsers, isLoading: isLoadingAllUsers } = useGetUsers(filter)
    
    const tabOptions = [
        { value: '', label: 'Barchasi' },
    ]
    
    groups?.forEach(group => {
        tabOptions.push({ value: group.id, label: group.title })
    })

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
                    <UsersTable
                        triggerRef={ref}
                        students={allUsers?.items}
                        isLoading={isLoadingAllUsers}
                    />
                ) : (
                    <Loader />
            )}
            </div>
    );
}

export default Users;