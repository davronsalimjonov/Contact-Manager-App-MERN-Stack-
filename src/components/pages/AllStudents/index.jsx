import { useState } from 'react';
import Loader from '@/components/UI/atoms/Loader';
import { useGetAllStudents } from '@/hooks/useStudents';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import AllStudentsTable from '@/components/templates/AllStudentsTable';
import AllStudentsSearchBar from '@/components/UI/organisms/AllStudentsSearchBar';
import cls from './AllStudents.module.scss';

const AllStudents = () => {
    const [filter, setFilter] = useState({});
    const [pagination, setPagination] = useState({ page: 0, limit: 10 });
    const { data: students, isLoading: isLoadingStudents } = useGetAllStudents({ ...filter, page: pagination.page + 1, limit: pagination.limit });

    const handleFilterChange = (key, value) => {
        setFilter(state => ({ ...state, [key]: value }))
        setPagination(state => ({ ...state, page: 0 }))
    }

    return (
        <div className={cls.page}>
            <AllStudentsSearchBar
                onChangeFirstName={e => handleFilterChange('firstName', e.target.value?.trim())}
                onChangeLastName={e => handleFilterChange('lastName', e.target.value?.trim())}
                onChangePhone={phone => handleFilterChange('phone', phone)}
                onChangeMentor={mentor => handleFilterChange('teacher', mentor?.value)}
                onChangeStatus={status => handleFilterChange('status', status?.value)}
                onChangeDegree={degree => handleFilterChange('level', degree?.value)}
                onChangeCourse={course => handleFilterChange('course', course?.value)}
                onChangeGroup={group => handleFilterChange('group', group?.value)}
            />
            {!isLoadingStudents ? (
                <AllStudentsTable
                    students={students?.items}
                    startIndex={pagination.page * pagination.limit}
                />
            ) : (
                <Loader />
            )}
            <Pagination
                page={pagination.page}
                pageCount={students?.meta?.totalPages}
                onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
            />
        </div>
    )
}

export default AllStudents;