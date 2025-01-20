import { useEffect, useState } from 'react'
import useGetGroups from '@/hooks/useGetGroups'
import cls from './MainMentorStudents.module.scss'
import MainMentorStudentsTable from '@/components/templates/MainMentorStudentsTable'
import MainMentorStudentsSearchBar from '@/components/UI/organisms/MainMentorStudentsSearchBar/indsx'
import MainMentorStudentsGroupTab from '@/components/UI/organisms/MainMentorStudentsGroupTab'
import { useGetUserId } from '@/hooks/useGetUser'
import Loader from '@/components/UI/atoms/Loader'
import { customToast } from '@/utils/toast'
import { addStudentsToGroup, createGroups } from '@/services/groups'
import { STUDENT_STATUS_ENUMS } from '@/constants'
import StudentStatus from '@/components/UI/atoms/StudentStatus'
import { useGetCourse } from '@/hooks/useGetCourse'
import { updateUserCourse } from '@/services/course'
import Pagination from '@/components/UI/moleculs/Pagination'
import useGetMentors from '@/hooks/useGetMentors'

const MainMentorStudents = () => {
    const academyMentor = useGetUserId()
    const [filter, setFilter] = useState({})
    const [groupId, setGroupId] = useState('')
    const [groupName, setGroupName] = useState('')
    const [selectedMentor, setSelectedMentor] = useState(null)
    const [isModal, setIsModal] = useState(false)
    const [transferModal, setIsTransferModal] = useState(false)
    const [selectedStudents, setSelectedStudents] = useState([])
    const [selectMainMentors, setSelectMainMentors] = useState([])
    const [selectedCourse, setSelectedCourse] = useState([])
    const [selectCallMentors, setSelectCallMentors] = useState([])
    const [selectStatus, setSelectStatus] = useState([])
    const [activeGroup, setActiveGroup] = useState('Barchasi')
    const [courseId, setCourseId] = useState('')
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, page }));
    };

    const handleLimitChange = (limit) => {
        setPagination((prev) => ({ ...prev, limit }));
    };


    const {
        callMentors: { data: callMentors, isLoading: isLoadingCallMentors },
        mainMentors: { data: mainMentors, isLoading: isLoadingMainMentors }
    } = useGetMentors()

    const {
        courseForSelect: { data: courseForSelect, isLoading: isCourseForSelectLoading },
    } = useGetCourse()

    const {
        groups: {data: groups, isLoading: isGroupsLoading} ,
        groupStudents: {data: groupStudents, isLoading: isGroupStudentsLoading, refetch},
        groupSelectStudents: { data: groupSelectStudents, isLoading: isLoadingGroupSelectStudents },
    } = useGetGroups({ group: groupId, ...filter, ...pagination }, groupId)

    const callMentorOptions = callMentors?.map((item) => (
        {
            value: `${item?.id}`,
            label: `${item?.firstName} ${item?.lastName}`
        }
    ))

    const mainMentorOptions = mainMentors?.map((item) => (
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

    const [tabOptions, setTabOptions] = useState([{ value: '', label: 'Barchasi' }]);

    useEffect(() => {
        const newTabs = groups?.map(group => ({ value: group.id, label: group.title })) || [];
        setTabOptions(prevState => {
            const existingValues = prevState.map(tab => tab.value);
            const uniqueTabs = newTabs.filter(tab => !existingValues.includes(tab.value));
            return [...prevState, ...uniqueTabs];
        });
    }, [groups]);

    useEffect(() => {}, [tabOptions, groupStudents])
    
    const handleCreateGroup = async () => {
        try {
            if (!groupName) {
                customToast.error("Guruh nomi bo'sh bo'lishi mumkin emas")
                return
            }

            if (!selectedMentor) {
                customToast.error("Nazoratchi mentor tanlanmagan")
                return
            }

            const existingGroup = tabOptions.find((tab) => tab.label === groupName)
            if (!existingGroup) {
                const response = await createGroups({
                    title: groupName,
                    academyMentor,
                    callMentor: selectedMentor.value,
                })

                if (response?.status === 201) {
                    setIsModal(false)
                    setGroupName("")
                    setSelectedMentor(null)
                    customToast.success("Gurux yaratildi!")

                    setTabOptions(prevState => [
                        ...prevState,
                        { value: response.data.id, label: response.data.title }
                    ]);
                } else {
                    customToast.error("Yaratishda xatolik yuz berdi.")
                }
            }
        } catch (error) {
            console.error("Error Details:", error)
            if (error.response) {
                console.error("Error Response:", error.response)
                customToast.error(
                    `Xatolik Yuz Berdi: ${error.response.status} - ${error.response.data.message || "Unknown Error"}`
                )
            } else {
                customToast.error("Xatolik Yuz Berdi")
            }
        }
    }

    const handleAddStudentToGroup = async () => {
        try {
            if (!selectedStudents || selectedStudents.length === 0) {
                customToast?.error("O'quvchilar Qo'shing")
                return
            }

            const response = await addStudentsToGroup({
                group: groupId,
                studentIds: selectedStudents,
            })

            if (response?.status === 201) {
                await refetch()
                setIsTransferModal(false)
                setSelectedStudents([]) 
                customToast?.success("O'quvchilar Guruxga Qo'shildi")
            } else {
                customToast?.error(`Xatolik: ${response?.statusText || "Unknown Error"}`)
            }
        } catch (error) {
            customToast?.error("Xatolik Yuz Berdi")
        }
    }

    const handleStudentTransfer = async () => {
        try {
            if (!selectedCourse || selectedCourse.length === 0) {
                customToast?.error("Kurs Tanlang!");
                return;
            }

            if (!selectMainMentors || selectMainMentors.length === 0) {
                customToast?.error("Asosiy Mentor Tanlang!");
                return;
            }

            if (!selectCallMentors || selectCallMentors.length === 0) {
                customToast?.error("Nazoratchi Mentor Tanlang!");
                return;
            }

            if (!selectStatus || selectStatus.length === 0) {
                customToast?.error("Status Tanlang!");
                return;
            }

            await updateUserCourse(courseId, {
                course: selectedCourse.value,
                teacher: selectMainMentors.value,
                secondTeacher: selectCallMentors.value,
                status: selectStatus.value
            })

            setIsTransferModal(false)
            setSelectedCourse([])
            setSelectMainMentors([])
            setSelectCallMentors([])
            setSelectStatus([])
            customToast?.success("Transfer Amalga Oshirildi")

        } catch (error) {
            customToast?.error("Xatolik Yuz Berdi")
        }
    }

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
                        setPagination={setPagination}
                        refetch={refetch}
                    />
                    <MainMentorStudentsSearchBar
                        onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                        onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                        onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
                        onChangeGroup={level => setFilter(state => ({ ...state, level: level?.label }))}
                        onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value }))}
                        statusOptions={statusOptions}
                        setIsTransferModal={setIsTransferModal}
                        activeGroup={activeGroup}
                    />
                    {!isGroupStudentsLoading ? (
                        <>
                            <MainMentorStudentsTable
                                students={groupStudents?.items}
                                isLoading={isGroupStudentsLoading}
                                selectedStudents={selectedStudents}
                                groupSelectStudents={groupSelectStudents}
                                setSelectedStudents={setSelectedStudents}
                                handleAddStudentToGroup={handleAddStudentToGroup}
                                isLoadingGroupSelectStudents={isLoadingGroupSelectStudents}
                                activeGroup={activeGroup}
                                callMentorOptions={callMentorOptions}
                                mainMentorOptions={mainMentorOptions}
                                statusOptions={statusOptionsSelect}
                                courseForSelect={courseForSelect}
                                selectedCourse={selectedCourse}
                                setSelectedCourse={setSelectedCourse}
                                selectMainMentors={selectMainMentors}
                                setSelectMainMentors={setSelectMainMentors}
                                selectCallMentors={selectCallMentors}
                                setSelectCallMentors={setSelectCallMentors}
                                selectStatus={selectStatus}
                                setSelectStatus={setSelectStatus}
                                handleStudentTranfer={handleStudentTransfer}
                                isModal={transferModal}
                                setIsModal={setIsTransferModal}
                                setCourseId={setCourseId}
                                metaData={groupStudents?.meta}
                                limit={pagination.limit}
                                setLimit={handleLimitChange}
                                page={pagination.page}
                                setPage={handlePageChange}
                            />
                            {groupStudents?.items?.length === 0 ? <></>
                                : <Pagination
                                    metaData={groupStudents?.meta}
                                    limit={pagination.limit}
                                    setLimit={handleLimitChange}
                                    page={pagination.page}
                                    setPage={handlePageChange}
                                />}
                        </>
                    ) : (
                        <Loader />
                    )}
                </>
            }
        </div>
    )
}

export default MainMentorStudents