import { useState } from 'react';
import useGetGroups from '@/hooks/useGetGroups';
import useGetStudents from '@/hooks/useGetStudents';
import cls from './Users.module.scss';
import UsersTable from '@/components/templates/UsersTable';
import UsersSearchBar from '@/components/UI/organisms/UsersSearchBar';
import { useGetUsers } from '@/hooks/useGetUsers';

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

    console.log(allUsers, 'ahhahahahah');
    
    return (
        <div className={cls.page}>
            <UsersSearchBar
                onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
                onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value }))}
                onChangeUniqueId={e => setFilter(state => ({ ...state, uniqueId: e.target.value?.trim()}))}
                onChangeDate={createdAt => setFilter(state => ({ ... state, createdAt}))}
            />
            <UsersTable
                triggerRef={ref}
                students={allUsers?.items}
                isLoading={isLoadingAllUsers}
            />
        </div>
    );
}

export default Users;