import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import GroupInfoCard from '@/components/UI/organisms/GroupInfoCard';
import GroupStudentsTable from '@/components/templates/GroupStudentsTable';
import cls from './SingleGroup.module.scss';

const SingleGroup = () => {
    const navigate = useNavigate()
    return (
        <div className={cls.page}>
            <GroupInfoCard onClickCreateSchedule={() => navigate('lesson-schedule')} />
            <GroupStudentsTable />
            <Pagination pageCount={10} />
        </div>
    );
}

export default SingleGroup;