import Loader from '@/components/UI/atoms/Loader';
import useSessionState from '@/hooks/useSessionState';
import { useGetAllStudents } from '@/hooks/useStudents';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import AllStudentsTable from '@/components/templates/AllStudentsTable';
import AllStudentsSearchBar from '@/components/UI/organisms/AllStudentsSearchBar';
import cls from './AllStudents.module.scss';

const AllStudents = ({ navigateToChat = false }) => {
    const [filter, setFilter] = useSessionState('all-students-filter', {});
    const [pagination, setPagination] = useSessionState('all-students-pagination', { page: 0, limit: 12 });
    const { data: students, isLoading: isLoadingStudents } = useGetAllStudents({ ...filter, page: pagination.page + 1, limit: pagination.limit });

    const handleFilterChange = (value) => {
        setFilter(value)
        setPagination(state => ({ ...state, page: 0 }))
    }

    return (
        <div className={cls.page}>
            <AllStudentsSearchBar
                onChange={handleFilterChange}
                defaultValue={filter}
            />
            {!isLoadingStudents ? (
                <AllStudentsTable
                    navigateToChat={navigateToChat}
                    students={students?.items}
                    startIndex={pagination.page * pagination.limit}
                />
            ) : (
                <Loader />
            )}
            <Pagination
                initialPage={pagination.page}
                page={pagination.page}
                pageCount={students?.meta?.totalPages}
                onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
            />
        </div>
    )
}

export default AllStudents;