import { useState } from 'react';
import useGetGroups from '@/hooks/useGetGroups';
import useGetStudents from '@/hooks/useGetStudents';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './MainMentorStudents.module.scss';
import MainMentorStudentsTable from '@/components/templates/MainMentorStudentsTable';
import MainMentorStudentsSearchBar from '@/components/UI/organisms/MainMentorStudentsSearchBar/indsx';
import MainMentorStudentsGroupTab from '@/components/UI/organisms/MainMentorStudentsGroupTab';

const MainMentorStudents = () => {
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
            <MainMentorStudentsGroupTab />
            <MainMentorStudentsSearchBar
                onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value }))}
                onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
            />
            <MainMentorStudentsTable    
                triggerRef={ref}
                students={students}
                isLoading={isLoadingStudents}
            />
        </div>
    );
}

export default MainMentorStudents;