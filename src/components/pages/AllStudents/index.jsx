
import cls from './AllStudents.module.scss';
import Loader from '@/components/UI/atoms/Loader';
import { useState } from 'react';
import { Pagination } from 'antd';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/UI/moleculs/Form/FormInput';
import FormSelect from '@/components/UI/moleculs/Form/FormSelect';
import { SearchIcon } from '@/components/UI/atoms/icons';
import { DEGREEOPTIONS, STUDENTS_STATUS_OPTION, UNITS } from '@/constants';
import Button from '@/components/UI/atoms/Buttons/Button';
import AllStudentsTable from '@/components/templates/AllStudentsTable';
import { useGetAllStudents } from '@/hooks/useGetAllStudents';
import AllStudentsSearchBar from '@/components/UI/organisms/AllStudentsSearchBar';

const defaultValues = {
    word: '',
    description: '',
    lvl: '',
    unit: ''
}

const AllStudents = () => {
    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
    }
    );

    const { ref, data: students, isLoading: isLoadingStudents } = useGetAllStudents(filter); 

    const onShowSizeChange = (current, pageSize) => {
        setFilter((prev) => {
            return {
                ...prev,
                page: current,
                limit: pageSize,
            }
        })
    };

    return (
        <>
            <AllStudentsSearchBar
                onChangeStatus={(status) => setFilter(state => ({
                    ...state, status: status?.value, page: 1,
                    limit: 10,
                }))}
                onChangeName={e => setFilter(state => ({
                    ...state, firstName: e.target.value?.trim(), page: 1,
                    limit: 10,
                }))}
                onChangeDegree={degree => setFilter(state => ({
                    ...state, level: degree?.value, page: 1,
                    limit: 10,
                }))}
                onChangeCourse={course => setFilter(state => ({
                    ...state, course: course?.value, page: 1,
                    limit: 10,
                }))}
            />
            <AllStudentsTable
                triggerRef={ref}
                students={students}
                isLoading={isLoadingStudents}
            />

            <div className={cls.pagination}>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={filter.page}
                    defaultPageSize={filter.limit}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} students`}
                    onChange={(page) => {
                        setFilter((prev) => {
                            return {
                                ...prev,
                                page: page,
                            }
                        })
                    }}
                    total={students?.meta?.totalItems}
                />
            </div>
        </>
    )
}

export default AllStudents;