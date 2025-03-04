import Loader from '@/components/UI/atoms/Loader';
import { useGetStudentsForAdaptation } from '@/hooks/useStudents';
import AdaptationWorkspaceTable from '@/components/templates/AdaptationWorkspaceTable';

const AdaptationWorkspace = () => {
    const { data: students, isLoading, updateStudentAdaptation } = useGetStudentsForAdaptation()

    return !isLoading ? (
        <AdaptationWorkspaceTable
            students={students}
            onDrop={updateStudentAdaptation}
        />
    ) : (
        <Loader />
    );
}

export default AdaptationWorkspace;