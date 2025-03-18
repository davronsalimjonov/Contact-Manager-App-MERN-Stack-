import { useState } from 'react';
import { getUserFullName } from '@/utils/lib';
import Loader from '@/components/UI/atoms/Loader';
import Select from '@/components/UI/atoms/Form/Select';
import { useGetAllAdaptation } from '@/hooks/useAdaptation';
import { useGetMentorsForOptions } from '@/hooks/useMentor';
import AdaptationWorkspaceTable from '@/components/templates/AdaptationWorkspaceTable';
import cls from './AcademyAdaptationWorkspace.module.scss'

const AcademyAdaptationWorkspace = () => {
    const [selectedMentor, setSelectedMentor] = useState()
    const { data: students, isLoading, updateStudentAdaptation } = useGetAllAdaptation({ mentorId: selectedMentor })
    const { callMentors: { data: callMentors } } = useGetMentorsForOptions()

    const options = [{ value: 'mentorsiz', label: 'Mentorsiz' }]
    callMentors?.forEach(mentor => options.push({ value: mentor.id, label: getUserFullName(mentor) }))

    return !isLoading ? (
        <div className={cls.page}>
            <Select
                placeholder='Mentorni tanlang'
                className={cls.page__select}
                options={options}
                onChange={mentor => setSelectedMentor(mentor?.value)}
                defaultValue={options?.find(option => option.value === selectedMentor)}
                isclearable
            />
            <AdaptationWorkspaceTable
                students={students}
                redirectToChat={false}
                allowReplaceMentor
                onDrop={updateStudentAdaptation}
            />
        </div>
    ) : (
        <Loader />
    );
}

export default AcademyAdaptationWorkspace;