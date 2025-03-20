import { Navigate, useParams } from 'react-router-dom';

const RedirectToStudentSingle = () => {
    const { courseId, userId } = useParams()
    return <Navigate to={`/students/${courseId}/${userId}`} replace />
}

export default RedirectToStudentSingle;