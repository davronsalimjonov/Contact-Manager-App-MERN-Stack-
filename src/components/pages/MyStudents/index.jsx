import { useState } from 'react';
import Tabs from '@/components/UI/moleculs/Tabs';
import useGetStudents from '@/hooks/useGetStudents';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './MyStudents.module.scss';
import { useQuery } from 'react-query';
import { useGetUserId } from '@/hooks/useGetUser';
import { getMentorGroups } from '@/services/course';

const MyStudents = () => {
    const userId = useGetUserId()
    const [status, setStatus] = useState()
    const [inputValue, setInputValue] = useState()
    const [activeGroup, setActiveGroup] = useState()
    const { ref, data: students, isLoading: isLoadingStudents } = useGetStudents({ status, firstName: inputValue, group: activeGroup })
    const { data: groups } = useQuery(['groups', userId], () => getMentorGroups(userId))

    const tabOptions = [
        { value: '', label: 'Barchasi' },
    ]

    groups.forEach(group => {
        tabOptions.push({value: group.id, label: group.title})
    })

    return (
        <div className={cls.page}>
            <Tabs options={tabOptions} onChange={setActiveGroup} />
            <StudentsSearchBar
                onChangeStatus={(status) => setStatus(status?.value)}
                onChangeInput={e => setInputValue(e.target.value)}
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