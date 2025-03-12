import Loader from '@/components/UI/atoms/Loader';
import useSessionState from '@/hooks/useSessionState';
import { useGetCallMentorStudents } from '@/hooks/useStudents';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './MyStudents.module.scss';

const MyStudents = () => {
    const [filter, setFilter] = useSessionState('my-students-filter', {})
    const { data: students, isLoading: isLoadingStudents } = useGetCallMentorStudents(filter)

    return (
        <div className={cls.page}>
            <StudentsSearchBar
                onChange={setFilter}
                defaultValue={filter}
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