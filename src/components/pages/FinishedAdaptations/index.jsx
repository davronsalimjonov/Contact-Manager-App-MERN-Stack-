import { useState } from 'react';
import Loader from '@/components/UI/atoms/Loader';
import Select from '@/components/UI/atoms/Form/Select';
import { debounce, getUserFullName } from '@/utils/lib';    
import { useGetMentorsForOptions } from '@/hooks/useMentor';
import FormInput from '@/components/UI/moleculs/Form/FormInput';
import { useGetFinishedAdaptations } from '@/hooks/useAdaptation';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import FormPhoneInput from '@/components/UI/moleculs/Form/FormPhoneInput';
import FinishedAdaptationsTable from '@/components/templates/FinishedAdaptationsTable';
import cls from './FinishedAdaptations.module.scss';

const FinishedAdaptations = () => {
    const [filter, setFilter] = useState({})
    const [pagination, setPagination] = useState({ page: 0, limit: 15 })
    const { callMentors: { data: callMentors } } = useGetMentorsForOptions()
    const { data: finishedAdaptations, isLoading } = useGetFinishedAdaptations({ page: pagination.page + 1, limit: pagination.limit, ...filter })

    const options = callMentors?.map(mentor => ({ value: mentor.id, label: getUserFullName(mentor) }))

    return (
        <div className={cls.page}>
            <div className={cls.page__filter}>
                <Select
                    placeholder='Mentorni tanlang'
                    className={cls.page__select}
                    options={options}
                    onChange={mentor => setFilter(state => ({ ...state, mentorId: mentor?.value }))}
                    isclearable
                />
                <FormPhoneInput
                    className={cls.page__input}
                    placeholder='Telefon raqami'
                    onChange={debounce(value => setFilter(state => ({ ...state, phone: value })))}
                />
                <FormInput
                    className={cls.page__input}
                    placeholder='Ismi'
                    onChange={debounce(e => setFilter(state => ({ ...state, firstName: e.target.value })))}
                />
                <FormInput
                    className={cls.page__input}
                    placeholder='Familiyasi'
                    onChange={debounce(e => setFilter(state => ({ ...state, lastName: e.target.value })))}
                />
            </div>
            {!isLoading ? (
                <>
                    <FinishedAdaptationsTable items={finishedAdaptations?.items} />
                    <Pagination
                        initialPage={pagination.page}
                        pageCount={finishedAdaptations?.meta?.totalPages}
                        page={pagination.page}
                        onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
                    />
                </>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default FinishedAdaptations;