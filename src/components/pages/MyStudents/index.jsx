import { useState } from 'react';
import useGetGroups from '@/hooks/useGetGroups';
import Tabs from '@/components/UI/moleculs/Tabs';
import useGetStudents from '@/hooks/useGetStudents';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './MyStudents.module.scss';

const MyStudents = () => {
    const [status, setStatus] = useState()
    const [inputValue, setInputValue] = useState()
    const [activeGroup, setActiveGroup] = useState()
    const { data: groups } = useGetGroups()
    const { ref, data: students, isLoading: isLoadingStudents } = useGetStudents({ status, firstName: inputValue, group: activeGroup })

    const tabOptions = [
        { value: '', label: 'Barchasi' },
    ]

    groups?.forEach(group => {
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