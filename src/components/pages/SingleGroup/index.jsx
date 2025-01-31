import GroupInfoCard from '@/components/UI/organisms/GroupInfoCard';
import GroupStudentsTable from '@/components/templates/GroupStudentsTable';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import cls from './SingleGroup.module.scss';

const SingleGroup = () => {
    return (
        <div className={cls.page}>
            <GroupInfoCard />
            <GroupStudentsTable />
            <Pagination pageCount={10} />
        </div>
    );
}

export default SingleGroup;