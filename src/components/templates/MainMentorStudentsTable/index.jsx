

import { getDayName } from '@/utils/time';
import { getUserFullName } from '@/utils/lib';
import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import EmptyData from '@/components/UI/organisms/EmptyData';
import StudentsTableRow from '../../UI/moleculs/StudentsTableRow';
import StudentsTableHeader from '../../UI/organisms/StudentsTableHeader';
import cls from './MainMentorStudentsTable.module.scss';
import MainMentorStudentsTableRow from '@/components/UI/moleculs/MainMentorStudentsTableRow';
import MainMentorStudentsTableHeader from '@/components/UI/organisms/MainMentorsStudentsTableHeader';
import Button from '@/components/UI/atoms/Buttons/Button';
import Dialog from '@/components/UI/moleculs/Dialog';
import { useState } from 'react';
import RedButton from '@/components/UI/atoms/Buttons/RedButton';
import Select from '@/components/UI/atoms/Form/Select';
import useGetGroups from '@/hooks/useGetGroups';

const MainMentorStudentsTable = ({
    students = [],
    triggerRef,
    isLoading,
    groupName='',
    groupId='',
    isFetched=false
}) => {
    const [isModal, setIsModal] = useState(false)
    

    const { 
        groupSelectStudents: { data: groupSelectStudents, isLoading: isLoadingGroupSelectStudents } 
    } = isFetched? useGetGroups({ group: groupId }, groupId) : { groupSelectStudents: { data: null, isLoading: false } };

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {students?.length > 0 ? (
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
                                />
                            )}
                        />
                        <tr ref={triggerRef}></tr>
                    </tbody>
                </table>
            ) : (
                !isLoading &&
                groupName && (
                    <div className={cls.mainMentorNoData}>
                        <p><span>"{groupName}"</span> guruh shakllantirildi. <br />
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
                        <Dialog isOpen={isModal} onClose={() => setIsModal(false)}>
                            <form className={cls.MainMentorStudentsGroupTab__dialog}>
                                <div className={cls.MainMentorStudentsGroupTab__dialog__select}>
                                    <label htmlFor="select">O'quvchi Qo'shish</label>
                                    <Select
                                        placeholder="O'quvchi Tanlang"
                                        // options={callMentorOptions}
                                        // value={selectedMentor}
                                        // onChange={handleMentorChange}
                                        isClearable
                                        isSearchable={true}
                                    />
                                </div>
                                <div className={cls.MainMentorStudentsGroupTab__dialog__buttons}>
                                    <RedButton onClick={() => setIsModal(false)}>Bekor Qilish</RedButton>
                                    <Button>Qo'shish</Button>
                                </div>
                            </form>
                        </Dialog>
                    </div>
                )
            )}
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default MainMentorStudentsTable;