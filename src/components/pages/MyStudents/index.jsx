import { useState } from 'react';
import Tabs from '@/components/UI/moleculs/Tabs';
import { useGetCallMentorStudents } from '@/hooks/useGetStudents';
import { useGetMyGroups } from '@/hooks/useGetGroups';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './MyStudents.module.scss';

const MyStudents = () => {
    const [filter, setFilter] = useState({})
    const { data: groups } = useGetMyGroups()
    const { ref, data: students, isLoading: isLoadingStudents } = useGetCallMentorStudents(filter)


    function getGroupOptions() {
        const options = [{ value: '', label: 'Barchasi' } ]
    
        groups?.forEach(group => {
            options.push({ value: group.id, label: group.title })
        })
    
        return options
    }

    return (
        <div className={cls.page}>
            <Tabs
                className={cls.page__tab}
                tabClassName={cls.page__tab__button}
                options={getGroupOptions()}
                onChange={group => setFilter(state => ({ ...state, group }))}
            />
            <StudentsSearchBar
                onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value }))}
                onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
            />
            <StudentsTable
                triggerRef={ref}
                students={students}
                isLoading={isLoadingStudents}
            />
        </div>
    );
}

export default MyStudents;