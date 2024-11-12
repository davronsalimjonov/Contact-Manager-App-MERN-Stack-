import { useState } from 'react';
import Tabs from '@/components/UI/moleculs/Tabs';
import useGetStudents from '@/hooks/useGetStudents';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './MyStudents.module.scss';

const MyStudents = () => {
    const [status, setStatus] = useState()
    const { ref, data: students } = useGetStudents({status})
    
    const tabOptions = [
        { value: '', label: 'Barchasi' },
        { value: 'a1', label: 'A1' },
        { value: 'a2', label: 'A2' },
        { value: 'b1', label: 'B1' },
        { value: 'b2', label: 'B2' },
        { value: 'c1', label: 'C1' },
    ]

    return (
        <div className={cls.page}>
            <Tabs options={tabOptions} />
            <StudentsSearchBar 
                onChangeStatus={(status) => setStatus(status?.value)}
            />
            <StudentsTable triggerRef={ref} students={students} />
        </div>
    );
}

export default MyStudents;