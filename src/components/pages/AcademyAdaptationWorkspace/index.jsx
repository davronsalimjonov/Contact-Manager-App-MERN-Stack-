import { useState } from 'react';
import { debounce, getUserFullName } from '@/utils/lib';
import Loader from '@/components/UI/atoms/Loader';
import Select from '@/components/UI/atoms/Form/Select';
import { useGetAllAdaptation } from '@/hooks/useAdaptation';
import { useGetMentorsForOptions } from '@/hooks/useMentor';
import FormInput from '@/components/UI/moleculs/Form/FormInput';
import FormPhoneInput from '@/components/UI/moleculs/Form/FormPhoneInput';
import AdaptationWorkspaceTable from '@/components/templates/AdaptationWorkspaceTable';
import cls from './AcademyAdaptationWorkspace.module.scss'

const AcademyAdaptationWorkspace = () => {
    const [filter, setFilter] = useState({})
    const { callMentors: { data: callMentors } } = useGetMentorsForOptions()
    const { data: students, isLoading, updateStudentAdaptation } = useGetAllAdaptation(filter)

    const options = [{ value: 'mentorsiz', label: 'Mentorsiz' }]
    callMentors?.forEach(mentor => options.push({ value: mentor.id, label: getUserFullName(mentor) }))

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
                <AdaptationWorkspaceTable
                    students={students}
                    withReminder={false}
                    allowReplaceMentor
                    onDrop={updateStudentAdaptation}
                />
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default AcademyAdaptationWorkspace;