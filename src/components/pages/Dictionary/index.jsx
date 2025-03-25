
import DictionaryTable from '@/components/templates/DictionaryTable';
import cls from './Dictionary.module.scss';
import { useGetWords } from '@/hooks/useGetWords';
import Loader from '@/components/UI/atoms/Loader';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/UI/moleculs/Form/FormInput';
import FormSelect from '@/components/UI/moleculs/Form/FormSelect';
import AddNewWord from '@/components/UI/organisms/AddNewWord';
import { SearchIcon } from '@/components/UI/atoms/icons';
import { DEGREEOPTIONS, UNITS } from '@/constants';
import Button from '@/components/UI/atoms/Buttons/Button';
import EmptyData from '@/components/UI/organisms/EmptyData';
import Pagination from '@/components/UI/moleculs/CustomPagination';

const defaultValues = {
    word: '',
    description: '',
    lvl: '',
    unit: ''
}

const Dictionary = () => {
    const { register, control, handleSubmit } = useForm({
        defaultValues,
        mode: 'onSubmit'
    });
    const [pagination, setPagination] = useState({ page: 0, limit: 10 });
    const [filter, setFilter] = useState({});
    const { data: words, isLoading: isLoadingWords } = useGetWords({ ...filter, page: pagination.page + 1, limit: pagination.limit });

    const handleSearch = async (data) => {
        setFilter({ ...data });
    }

    console.log(pagination, 'pagination');


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
                    isclearable={true}
                    placeholder='Mavzular'
                />

                <FormSelect
                    className={cls.filter__select}
                    name="lvl"
                    control={control}
                    options={DEGREEOPTIONS}
                    isclearable={true}
                    placeholder='Darajasi'
                />
                <Button type='submit' className={cls.button}>Qidirish <SearchIcon /></Button>
                <AddNewWord />

            </form>
            {isLoadingWords ? <Loader /> :
                (words?.meta?.totalItems > 0) ? <div className={cls.dictionary}>
                    <DictionaryTable words={words} />
                    <div className={cls.dictionary__pagination}>
                        <Pagination
                            initialPage={pagination.page}
                            pageCount={words?.meta?.totalPages}
                            onPageChange={({ selected }) => setPagination({ ...pagination, page: selected })}
                            page={pagination.page}
                            breakLabel={false}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={0}
                            className={cls.dictionary__pagination__style}
                        />
                        <select
                            value={pagination?.limit}
                            onChange={(e) => setPagination({ ...pagination, limit: e.target.value })}
                        >
                            <option value={pagination.limit} disabled>{pagination.limit}</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        
                    </div>
                </div> : <EmptyData text="Lug'atda bunday so'z mavjud emas." />
            }
        </>
    )
}

export default Dictionary;