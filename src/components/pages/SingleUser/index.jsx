import { useParams } from 'react-router-dom';
import UserCourseTable from '@/components/UI/organisms/UserCourseTable';
import UserInformationForm from '@/components/UI/organisms/UserInformationForm';
import cls from './SingleUser.module.scss';

const SingleUser = () => {
    const { userId } = useParams()
    return (
        <div className={cls.page}>
            <UserInformationForm userId={userId} />
            <UserCourseTable userId={userId} disabled={false} />
        </div>
    );
}

export default SingleUser;