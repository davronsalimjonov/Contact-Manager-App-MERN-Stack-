import { useState } from 'react';
import useGetGroups from '@/hooks/useGetGroups';
import cls from './MainMentorStudents.module.scss';
import MainMentorStudentsTable from '@/components/templates/MainMentorStudentsTable';
import MainMentorStudentsSearchBar from '@/components/UI/organisms/MainMentorStudentsSearchBar/indsx';
import MainMentorStudentsGroupTab from '@/components/UI/organisms/MainMentorStudentsGroupTab';
import { useGetMentors } from '@/hooks/useGetMentors';
import { useGetUserId } from '@/hooks/useGetUser';
import Loader from '@/components/UI/atoms/Loader';
import { customToast } from '@/utils/toast';
import { addStudentsToGroup, createGroups } from '@/services/groups';
import { STUDENT_STATUS_ENUMS } from '@/constants';
import StudentStatus from '@/components/UI/atoms/StudentStatus';
import { useGetCourse } from '@/hooks/useGetCourse';

const MainMentorStudents = () => {
    const academyMentor = useGetUserId()
    const [filter, setFilter] = useState({})
    const [groupId, setGroupId] = useState('')
    const [groupName, setGroupName] = useState('')
    const [selectedMentor, setSelectedMentor] = useState(null)
    const [isModal, setIsModal] = useState(false)
    const [selectedStudents, setSelectedStudents] = useState([])
    const [activeGroup, setActiveGroup] = useState('Barchasi') 
    
    const { 
        callMentors: { data: callMentors, isLoading: isLoadingCallMentors},
    } = useGetMentors()

    const {
        courseForSelect: { data: courseForSelect, isLoading: isCourseForSelectLoading},
    } = useGetCourse()

    const {
        groups: {data: groups, isLoading: isGroupsLoading},
        groupStudents: {data: groupStudents, isLoading: isGroupStudentsLoading },
        groupSelectStudents: { data: groupSelectStudents, isLoading: isLoadingGroupSelectStudents } 
    } = useGetGroups({ group: groupId, ...filter }, groupId)

    const callMentorOptions = callMentors?.map((item) => (
        {
            value: `${item?.id}`,
            label: `${item?.firstName} ${item?.lastName}`
        }
    )) 

    console.log(courseForSelect);
    

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value)
    }
    
    const handleMentorChange = (option) => {
        setSelectedMentor(option)
    }

    const tabOptions = [
        { value: '', label: 'Barchasi' },
      ]
    
    groups?.forEach(group => {
        tabOptions.push({ value: group.id, label: group.title })
    })

    const handleCreateGroup = async () => {
        try {
            if (!groupName) {
                customToast.error("Guruh nomi bo'sh bo'lishi mumkin emas");
                return;
            }
    
            if (!selectedMentor) {
                customToast.error("Nazoratchi mentor tanlanmagan");
                return;
            }
    
            const existingGroup = tabOptions.find((tab) => tab.label === groupName);
            if (!existingGroup) {
                const response = await createGroups({
                    title: groupName,
                    academyMentor,
                    callMentor: selectedMentor.value,
                });
    
                if (response?.status === 201) {
                    setIsModal(false);
                    setGroupName("");
                    setSelectedMentor(null);
                    customToast.success("Gurux yaratildi!");
                } else {
                    customToast.error("Yaratishda xatolik yuz berdi.");
                }
            }
        } catch (error) {
            console.error("Error Details:", error);
            if (error.response) {
                console.error("Error Response:", error.response);
                customToast.error(
                    `Xatolik Yuz Berdi: ${error.response.status} - ${error.response.data.message || "Unknown Error"}`
                );
            } else {
                customToast.error("Xatolik Yuz Berdi");
            }
        }
    };

    const handleAddStudentToGroup = async () => {
        try {
            if (!selectedStudents || selectedStudents.length === 0) {
                customToast?.error("O'quvchilar Qo'shing");
                return;
            }
    
            const response = await addStudentsToGroup({
                group: groupId,
                studentIds: selectedStudents,
            });
    
            console.log(response)
    
            if (response?.status === 201) {
                setSelectedStudents([]); 
                customToast?.success("O'quvchilar Guruxga Qo'shildi");
            } else {
                customToast?.error(`Xatolik: ${response?.statusText || "Unknown Error"}`);
            }
        } catch (error) {
            customToast?.error("Xatolik Yuz Berdi");
        }
    };

    const statusOptions = STUDENT_STATUS_ENUMS.map((status) => ({ value: status, label: status }))
    const statusOptionsSelect = STUDENT_STATUS_ENUMS.map((status) => ({ value: status, label: <StudentStatus status={status} /> }))

    return (
        <div className={cls.page}>
            {
                <>
                    <MainMentorStudentsGroupTab 
                        handleMentorChange={handleMentorChange} 
                        handleGroupNameChange={handleGroupNameChange}
                        handleCreateGroup={handleCreateGroup}
                        callMentorOptions={callMentorOptions}
                        groupName={groupName}
                        setGroupName={setGroupName}
                        selectedMentor={selectedMentor}
                        setGroupId={setGroupId}
                        tabOptions={tabOptions}
                        isModal={isModal}
                        setIsModal={setIsModal}
                        activeGroup={activeGroup}
                        setActiveGroup={setActiveGroup}
                    />
                    <MainMentorStudentsSearchBar
                        onChangeFirstName={e => setFilter(state => ({...state, firstName: e.target.value?.trim() }))}
                        onChangeLastName={e => setFilter(state => ({...state, lastName: e.target.value?.trim() }))}
                        onChangePhone={phone => setFilter(state => ({...state, phone }))}
                        onChangeGroup={level => setFilter(state => ({...state, level: level?.label}))}
                        onChangeStatus={(status) => setFilter(state => ({...state, status: status?.value }))}
                        statusOptions={statusOptions}
                    />
                    {!isGroupStudentsLoading ? (
                        <MainMentorStudentsTable  
                            students={groupStudents?.items}
                            isLoading={isGroupStudentsLoading}
                            selectedStudents={selectedStudents}
                            groupSelectStudents={groupSelectStudents}
                            setSelectedStudents={setSelectedStudents}
                            handleAddStudentToGroup={handleAddStudentToGroup}
                            isLoadingGroupSelectStudents={isLoadingGroupSelectStudents}
                            isModal={isModal}
                            setIsModal={setIsModal}
                            activeGroup={activeGroup}
                            callMentorOptions={callMentorOptions}
                            statusOptions={statusOptionsSelect}
                        />
                    ) : (
                        <Loader />
                    )}
                </>
            }
        </div>
    );
}

export default MainMentorStudents;