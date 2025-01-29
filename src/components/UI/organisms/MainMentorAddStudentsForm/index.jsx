import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormSelect from '../../moleculs/Form/FormSelect'
import cls from './MainMentorAddStudentsForm.module.scss'
import useGetMentors from '@/hooks/useGetMentors'
import { STUDENT_STATUS_ENUMS } from '@/constants'
import { useGetCourse } from '@/hooks/useGetCourse'
import StudentStatus from '../../atoms/StudentStatus'
import Dialog from '../../moleculs/Dialog'
import RedButton from '../../atoms/Buttons/RedButton'
import Button from '../../atoms/Buttons/Button'
import { CloseIcon } from '../../atoms/icons'
import Select from '../../atoms/Form/Select'
import { customToast } from '@/utils/toast'

const MainMentorAddStudentsForm = ({
    isOpen = false,
    onClose,
    isTransfer = false,
    onSubmit,
    groupSelectStudents,
    selectedStudents = [],
    setSelectedStudents,
    setIsOpen,
    AddStudentToGroup
}) => {
    const { control, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful } } = useForm()
    const { courseForSelect: { data: courseForSelect }, } = useGetCourse()
    const { callMentors: { data: callMentors }, mainMentors: { data: mainMentors } } = useGetMentors()

    const callMentorOptions = callMentors?.map((item) => ({ value: `${item?.id}`, label: `${item?.firstName} ${item?.lastName}` }))
    const mainMentorOptions = mainMentors?.map((item) => ({ value: `${item?.id}`, label: `${item?.firstName} ${item?.lastName}` }))
    const statusOptions = STUDENT_STATUS_ENUMS?.map((status) => ({ value: status, label: <StudentStatus status={status} /> }))
    const selectStudentOptions = groupSelectStudents?.map((student) => ({ value: student?.id, label: `${student?.user?.firstName} ${student?.user?.lastName}` }))
    const courseForSelectOptions = courseForSelect?.map((item) => ({ value: item?.id, label: item?.title }))

    useEffect(() => {
        if (isSubmitSuccessful) reset()

    }, [isSubmitSuccessful])

    const handleStudentChange = (selectedOptions) => {
        const selectedValues = selectedOptions?.map((option) => option.value) || []

        const duplicateSelections = selectedValues.filter(value =>
            selectedStudents.includes(value)
        );

        if (duplicateSelections.length > 0) {
            customToast.error("Bu o'quvchini Tanladingiz");
        } else {
            setSelectedStudents((prevSelectedStudents) => {
                const newSelectedStudents = [...prevSelectedStudents, ...selectedValues];
                return [...new Set(newSelectedStudents)];
            });
        }
    }

    const handleClick = (studentToRemove) => {
        setSelectedStudents((prevSelectedStudents) => {
            return prevSelectedStudents.filter((student) => student !== studentToRemove);
        });
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.MainMentorStudentsGroupTab__dialog} onSubmit={handleSubmit(onSubmit)}>
                {isTransfer ?
                    <div className={cls.transferSelects}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <FormSelect
                                label='Kurs'
                                placeholder="Kursni Tanlang"
                                options={courseForSelectOptions}
                                isSearchable={true}
                                name='course'
                                control={control}
                                rules={{ required: 'Kurs Tanlang' }}
                                isClearable
                            />
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                            <FormSelect
                                label='Asosuy Mentor'
                                placeholder="Asosiy Mentorni Tanlang"
                                isClearable
                                isSearchable={true}
                                options={mainMentorOptions}
                                control={control}
                                name='teacher'
                                rules={{ required: "Asosiy Mentor Tanlang" }}
                            />
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                            <FormSelect
                                label='Call Mentorni Tanlang'
                                placeholder="Nazoratchi Mentorni Tanlang"
                                options={callMentorOptions}
                                isClearable
                                isSearchable={true}
                                control={control}
                                name='secondTeacher'
                                rules={{ required: "Nazoratchi Mentor Tanlang" }}
                            />
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                            <FormSelect
                                label='Status Tanlang'
                                placeholder="Statusni Tanlang"
                                options={statusOptions}
                                isClearable
                                isSearchable={true}
                                control={control}
                                name='status'
                                rules={{ required: "Status Tanlang" }}
                            />
                        </div>
                    </div>
                    :
                    <div>
                        <div className={cls.MainMentorStudentsGroupTab__dialog__select}>
                            <Select
                                placeholder="O'quvchi Tanlang"
                                options={selectStudentOptions}
                                onChange={handleStudentChange}
                                value={[]}
                                isMulti
                                isClearable
                                isSearchable={true}
                            />
                        </div>
                        {selectedStudents?.map((selectedId) => (
                            <div key={`selectedStudendts-${selectedId}`} className={cls.selectedStudentOption}>
                                <p>{selectStudentOptions.find(option => option.value === selectedId)?.label || ""}</p>
                                <button onClick={() => handleClick(selectedId)}><CloseIcon /></button>
                            </div>
                        ))}
                    </div>
                }
                <div className={cls.MainMentorStudentsGroupTab__dialog__buttons}>
                    <RedButton onClick={() => {
                        setIsOpen(false)
                        setSelectedStudents([])
                    }}>Bekor Qilish</RedButton>
                    <Button type='submit' isLoading={isSubmitting}
                        onClick={!isTransfer && AddStudentToGroup}
                    >Qo'shish</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default MainMentorAddStudentsForm