import { useState } from 'react';
import Loader from '@/components/UI/atoms/Loader';
import { useGetCallMentorStudents } from '@/hooks/useStudents';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './MyStudents.module.scss';

const MyStudents = () => {
    const [filter, setFilter] = useState({})
    const { data: students, isLoading: isLoadingStudents } = useGetCallMentorStudents(filter)

    return (
        <div className={cls.page}>
            <StudentsSearchBar
                onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value }))}
                onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
            />
            {!isLoadingStudents ? (
                <StudentsTable students={students} />
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default MyStudents;