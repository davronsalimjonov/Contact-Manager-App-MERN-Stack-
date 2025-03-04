import { useState } from 'react';
import Tabs from '@/components/UI/moleculs/Tabs';
import { useGetCallMentorStudents } from '@/hooks/useStudents';
import { useGetMyGroups } from '@/hooks/useGetGroups';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './MyStudents.module.scss';
import Loader from '@/components/UI/atoms/Loader';

const MyStudents = () => {
    const [filter, setFilter] = useState({})
    const { data: groups } = useGetMyGroups()
    const { data: students, isLoading: isLoadingStudents } = useGetCallMentorStudents(filter)

    function getGroupOptions() {
        const options = [{ value: '', label: 'Barchasi' }]

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
            {!isLoadingStudents ? (
                <StudentsTable
                    groupId={filter.group}
                    students={students}
                />
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default MyStudents;