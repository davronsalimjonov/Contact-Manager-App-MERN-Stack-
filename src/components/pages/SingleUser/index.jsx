import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { customToast } from '@/utils/toast';
import { updateUser } from '@/services/user';
import { objectToFormData } from '@/utils/lib';
import Loader from '@/components/UI/atoms/Loader';
import { useGetUserById } from '@/hooks/useUsers';
import UserCourseTable from '@/components/UI/organisms/UserCourseTable';
import UserInformationForm from '@/components/UI/organisms/UserInformationForm';
import cls from './SingleUser.module.scss';

const SingleUser = () => {
    const { userId } = useParams()
    return (
        <div className={cls.page}>
            <UserInformationForm
                userId={userId}
            />
            <UserCourseTable userId={userId} disabled={false} />
        </div>
    );
}

export default SingleUser;