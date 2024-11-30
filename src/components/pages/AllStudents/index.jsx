
import cls from './AllStudents.module.scss';
import Loader from '@/components/UI/atoms/Loader';
import { useState } from 'react';
import { Pagination } from 'antd';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/UI/moleculs/Form/FormInput';
import FormSelect from '@/components/UI/moleculs/Form/FormSelect';
import { SearchIcon } from '@/components/UI/atoms/icons';
import { DEGREEOPTIONS, UNITS } from '@/constants';
import Button from '@/components/UI/atoms/Buttons/Button';
import useGetStudents from '@/hooks/useGetStudents';
import AllStudentsTable from '@/components/templates/AllStudentsTable';
import { useGetAllStudents } from '@/hooks/useGetAllStudents';

const defaultValues = {
    word: '',
    description: '',
    lvl: '',
    unit: ''
}

const AllStudents = () => {
    const { register, control, handleSubmit } = useForm({
        defaultValues,
        mode: 'onSubmit'
    });

    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
    }
    );

    const { data: students, isLoading: isLoadingStudents } = useGetAllStudents(filter);  //TODO

console.log(students);

    const handleSearch = async (data) => {
        setFilter({ ...data, page: 1, limit: 10 });
    }

    const onShowSizeChange = (current, pageSize) => {
        setFilter((prev) => {
            return {
                ...prev,
                page: current,
                limit: pageSize,
            }
        })
    };


    if (isLoadingStudents) return (
        <Loader />
    )

    return (
        <>
            <form onSubmit={handleSubmit(handleSearch)} className={cls.filter}>
                <FormInput
                    className={cls.filter__input}
                    preffix={<SearchIcon fill='#a2a0b3' />}
                    placeholder={'Inglizchasi'}
                    register={{ ...register('word') }}
                />

                <FormInput
                    className={cls.filter__input}
                    preffix={<SearchIcon fill='#a2a0b3' />}
                    placeholder={'O’zbekcha'}
                    register={{ ...register('description') }}
                />

                <FormSelect
                    className={cls.filter__select}
                    control={control}
                    name='unit'
                    options={UNITS}
                    isClearable={true}
                    placeholder='Mavzular'
                />

                <FormSelect
                    className={cls.filter__select}
                    name="lvl"
                    control={control}
                    options={DEGREEOPTIONS}
                    isClearable={true}
                    placeholder='Darajasi'
                />
                <Button type='submit' className={cls.button}>Qidirish <SearchIcon /></Button>
                {/* <AddNewWord /> */}
                {/* TODO */}

            </form>
            <AllStudentsTable students={students} />

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