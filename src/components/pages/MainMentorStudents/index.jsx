import { useState } from 'react';
import useGetGroups from '@/hooks/useGetGroups';
import useGetStudents from '@/hooks/useGetStudents';
import cls from './MainMentorStudents.module.scss';
import MainMentorStudentsTable from '@/components/templates/MainMentorStudentsTable';
import MainMentorStudentsSearchBar from '@/components/UI/organisms/MainMentorStudentsSearchBar/indsx';
import MainMentorStudentsGroupTab from '@/components/UI/organisms/MainMentorStudentsGroupTab';
import { useGetMentors } from '@/hooks/useGetMentors';
import { useGetUserId } from '@/hooks/useGetUser';
import Loader from '@/components/UI/atoms/Loader';


const MainMentorStudents = () => {
    const academyMentor = useGetUserId()
    const [filter, setFilter] = useState({})
    const [groupId, setGroupId] = useState('')
    const [groupName, setGroupName] = useState('')
    const [selectedMentor, setSelectedMentor] = useState(null)
    const { ref, data: students, isLoading: isLoadingStudents } = useGetStudents(filter)
    const { 
        callMentors: { data: callMentors, isLoading: isLoadingCallMentors},
    } = useGetMentors()

    const {
        groups: {data: groups, isLoading: isGroupsLoading},
        groupStudents: {data: groupStudents, isLoading: isGroupStudentsLoading }
    } = useGetGroups({ group: groupId })

    const callMentorOptions = callMentors?.callMentors?.map((item) => (
        {
            value: `${item?.id}`,
            label: `${item?.firstName} ${item?.lastName}`
        }
    )) 

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value)
    }
    
    const handleMentorChange = (option) => {
        setSelectedMentor(option)
    }

    const handleCreateGroup = () => {
        try {
            if (!groupName) {
            customToast.error("Guruh nomi bo'sh bo'lishi mumkin emas")
            return
            }
        
            if (!selectedMentor) {
            customToast.error("Nazoratchi mentor tanlanmagan")
            return
            }
        
            const existingGroup = tabOptions.find((tab) => tab.label === groupName);
            if (existingGroup) {
            customToast.error("Bunday Guruh Mavjud. Guruhga Boshqa Nom Bering!");
            return;
            } else {
            createGroups({
                title: groupName,
                academyMentor,
                callMentor: selectedMentor.value,
            });
            setIsModal(false);
            setGroupName('');
            setSelectedMentor(null);
            customToast.success("Gurux yaratildi!");
            }
        } catch (error) {
            customToast.error("Xatolik Yuz Berdi")
        }
    }

    return (
        <div className={cls.page}>
            {
                (
                    !isGroupStudentsLoading &&
                    !isGroupsLoading
                ) ? (
                    <>
                        <MainMentorStudentsGroupTab 
                            groups={groups} 
                            handleMentorChange={handleMentorChange} 
                            handleGroupNameChange={handleGroupNameChange}
                            handleCreateGroup={handleCreateGroup}
                            callMentorOptions={callMentorOptions}
                            groupName={groupName}
                            selectedMentor={selectedMentor}
                            setGroupId={setGroupId}
                        />
                        <MainMentorStudentsSearchBar
                            onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value }))}
                            onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                            onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                            onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
                        />
                        <MainMentorStudentsTable    
                            triggerRef={ref}
                            students={students}
                            isLoading={isLoadingStudents}
                        />
                    </>
                ) : (<Loader />)
            }
            
        </div>
    );
}

export default MainMentorStudents;