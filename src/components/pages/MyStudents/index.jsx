import { useState } from 'react';
import useGetGroups from '@/hooks/useGetGroups';
import Tabs from '@/components/UI/moleculs/Tabs';
import { sanitizePhoneNumber } from '@/utils/lib';
import useGetStudents from '@/hooks/useGetStudents';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './MyStudents.module.scss';

const MyStudents = () => {
    const [filter, setFilter] = useState({})
    const { data: groups } = useGetGroups()
    const { ref, data: students, isLoading: isLoadingStudents } = useGetStudents(filter)

    const tabOptions = [
        { value: '', label: 'Barchasi' },
    ]

    groups?.forEach(group => {
        tabOptions.push({ value: group.id, label: group.title })
    })

    return (
        <div className={cls.page}>
            <Tabs options={tabOptions} onChange={group => setFilter(state => ({ ...state, group }))} />
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