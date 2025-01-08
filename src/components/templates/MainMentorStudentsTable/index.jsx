

import { getDayName } from '@/utils/time';
import { getUserFullName } from '@/utils/lib';
import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import cls from './MainMentorStudentsTable.module.scss';
import MainMentorStudentsTableRow from '@/components/UI/moleculs/MainMentorStudentsTableRow';
import MainMentorStudentsTableHeader from '@/components/UI/organisms/MainMentorsStudentsTableHeader';
import Button from '@/components/UI/atoms/Buttons/Button';
import Dialog from '@/components/UI/moleculs/Dialog';
import RedButton from '@/components/UI/atoms/Buttons/RedButton';
import Select from '@/components/UI/atoms/Form/Select';
import { customToast } from '@/utils/toast';
import { CloseIcon } from '@/components/UI/atoms/icons';
import { useState } from 'react';

const MainMentorStudentsTable = ({
    students = [],
    isLoading,
    selectedStudents=[],
    groupSelectStudents,
    setSelectedStudents,
    handleAddStudentToGroup,
    isLoadingGroupSelectStudents,
    activeGroup='',
    callMentorOptions=[],
    mainMentorOptions=[],
    statusOptions=[],
    courseForSelect=[],
    selectedCourse=[],
    setSelectedCourse,
    selectMainMentors=[],
    setSelectMainMentors,
    selectCallMentors=[],
    setSelectCallMentors,
    selectStatus=[],
    setSelectStatus,
    handleStudentTranfer,
    isModal=false,
    setIsModal,
    setCourseId
}) => {
    const selectStudentOptions = []
    const courseForSelectOptions = []
    const [isTransfer, setIsTransfer] = useState(false)

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

    const handleCourseOptionChange = (selectedOptions) => {
        setSelectedCourse(selectedOptions)
    };

    const handleMainMentorOptionChange = (selectedOptions) => {
        setSelectMainMentors(selectedOptions)
    }

    const handleCallMentorOptionChange = (selectedOptions) => {
        setSelectCallMentors(selectedOptions)
    }

    const handleStatusOptionsChange = (selectedOptions) => {
        setSelectStatus(selectedOptions)
    }

    groupSelectStudents?.forEach(groupStudent => {
        selectStudentOptions.push({value: groupStudent?.id, label: `${groupStudent?.user?.firstName} ${groupStudent?.user?.lastName}`, level: `${groupStudent?.level}`})
    })

    courseForSelect?.forEach(courseSelect => {
        courseForSelectOptions.push({value: courseSelect?.id, label: courseSelect?.title})
    })

    const handleClick = (studentToRemove) => {
        setSelectedStudents((prevSelectedStudents) => {
            return prevSelectedStudents.filter((student) => student!== studentToRemove);
        });
    }

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Dialog isOpen={isModal} onClose={() => {
                    setIsModal(false)
                    setIsTransfer(false)
                    setSelectedStudents([])
                }}>
                    <form className={cls.MainMentorStudentsGroupTab__dialog}>
                        {isTransfer ? <>
                                <div className={cls.transferSelects}>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <label>Kurs</label>
                                        <Select
                                            placeholder="Kursni Tanlang"
                                            options={courseForSelectOptions}
                                            onChange={handleCourseOptionChange}
                                            value={selectedCourse}
                                            isClearable
                                            isSearchable={true}
                                            className={cls.transferSelects__select}
                                        />
                                    </div>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <label htmlFor="select">Asosiy Mentor</label>
                                        <Select
                                            placeholder="Asosiy Mentorni Tanlang"
                                            options={mainMentorOptions}
                                            onChange={handleMainMentorOptionChange}
                                            value={selectMainMentors}
                                            isClearable
                                            isSearchable={true}
                                            className={cls.transferSelects__select}
                                        />
                                    </div>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <label htmlFor="select">Nazoratchi Mentor</label>
                                        <Select
                                            placeholder="Nazoratchi Mentorni Tanlang"
                                            options={callMentorOptions}
                                            onChange={handleCallMentorOptionChange}
                                            value={selectCallMentors}
                                            isClearable
                                            isSearchable={true}
                                            className={cls.transferSelects__select}
                                        />
                                    </div>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <label htmlFor="select">O'quvchi Statusi</label>
                                        <Select
                                            placeholder="Statusni Tanlang"
                                            options={statusOptions}
                                            onChange={handleStatusOptionsChange}
                                            value={selectStatus}
                                            isClearable
                                            isSearchable={true}
                                            className={cls.transferSelects__select}
                                        />
                                    </div>
                                </div>
                            </> : <>
                            <div className={cls.MainMentorStudentsGroupTab__dialog__select}>
                                {!isLoadingGroupSelectStudents ?
                                    <>
                                        <label htmlFor="select">O'quvchi Qo'shish</label>
                                        <Select
                                            placeholder="O'quvchi Tanlang"
                                            options={selectStudentOptions}
                                            onChange={handleStudentChange}
                                            value={[]}
                                            isMulti
                                            isClearable
                                            isSearchable={true}
                                        />
                                    </> : <Loader />
                                }
                            </div>
                            {selectedStudents?.map((selectedId) => (
                                <div key={`selectedStudendts-${selectedId}`} className={cls.selectedStudentOption}>
                                    <p>{selectStudentOptions.find(option => option.value === selectedId)?.label || ""}</p>
                                    <button onClick={() => handleClick(selectedId)}><CloseIcon /></button>
                                </div>
                            ))}
                        </>}
                        <div className={cls.MainMentorStudentsGroupTab__dialog__buttons}>
                            <RedButton onClick={() => {
                                setIsModal(false)
                                setIsTransfer(false)
                                setSelectedStudents([])
                                setSelectedCourse([])
                                setSelectMainMentors([])
                                setSelectCallMentors([])
                                setSelectStatus([])
                            }}>Bekor Qilish</RedButton>
                            <Button onClick={isTransfer ? handleStudentTranfer : handleAddStudentToGroup}>Qo'shish</Button>
                        </div>
                    </form>
                </Dialog>
                {students?.length === 0 ? (
                    <div className={cls.mainMentorNoData}>
                        <p><span>"{activeGroup}"</span> guruh shakllantirildi. <br />
                        Guruhingizga o’quvchi biriktirsangiz bo’ladi.</p>
                        <div>
                            <Button className={cls.bar__form__button} onClick={
                                () => {
                                    setIsModal(true)
                                }
                            }>
                                O'quvchi Qo'shish
                                <span>+</span>
                            </Button>
                        </div>
                    </div>
                    ) : (
                        <>
                            <table className={cls.table}>
                                <MainMentorStudentsTableHeader />
                                <tbody>
                                    <Mapper
                                        data={students}
                                        isInfinityQuery
                                        isLoading={isLoading}
                                        renderItem={(student, index) => (
                                            <MainMentorStudentsTableRow
                                                key={student?.id}
                                                index={index + 1}
                                                unreadedMessagesCount={student?.messageCount}
                                                avatar={student?.url}
                                                fullName={getUserFullName(student)}
                                                phoneNumber={student?.phone}
                                                days={student?.days?.map(day => getDayName(day, 'short')).join(', ') || ''}
                                                time={student?.connectionTime}
                                                status={student?.status}
                                                userCourseId={student.id}
                                                hidden={true}
                                                chatId={student?.id}
                                                group={student?.level}
                                                setIsTransfer={setIsTransfer}
                                                setIsModal={setIsModal}
                                                setCourseId={setCourseId}
                                            />
                                        )}
                                    />
                                </tbody>
                            </table>
                        </>
                    )
                }
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default MainMentorStudentsTable;