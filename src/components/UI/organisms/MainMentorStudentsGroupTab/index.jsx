import { useState } from 'react'
import toast from 'react-hot-toast'
import { useGetUserId } from '@/hooks/useGetUser'
import useGetGroups, { useGroupMutations } from '@/hooks/useGetGroups'
import { PlusIcon } from '../../atoms/icons'
import Button from '../../atoms/Buttons/Button'
import WhiteButton from '../../atoms/Buttons/WhiteButton'
import { CreateGroupForm } from '../CreateGroupForm'
import cls from './MainMentorStudentsGroupTab.module.scss'

const MainMentorStudentsGroupTab = ({
  onGroupChange,
  setGroupId,
  setGroupLabel
}) => {
  const userId = useGetUserId()
  const [isOpen, setIsOpen] = useState(false)
  const { groups: { data: groups } } = useGetGroups()
  const { createGroupMutation } = useGroupMutations()
  const groupOptions = [{ value: '', label: 'Barchasi' }, ...(groups?.map(group => ({ value: group.id, label: group.title })) || [])]
  const [activeGroup, setActiveGroup] = useState(groupOptions?.[0].value)

  const handleGroupChange = (groupId) => {
    setActiveGroup(groupId)
    onGroupChange?.(groupId)
    setGroupId(groupId)
  }

  const handleCreateGroup = async (data) => {
    data.academyMentor = userId
    await createGroupMutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Gurux Yaratildi!")
        setIsOpen(false)
      },
      onError: (err) => toast.error(err?.response?.data?.message || "Xatolik Yuz Berdi!")
    })
  }

  return (
    <div className={cls.MainMentorStudentsGroupTab}>
      <div className={cls.MainMentorStudentsGroupTab__tabs}>
        {groupOptions?.map((tab) => (
          <Button
            key={tab.value}
            className={activeGroup === `${tab?.value}` ? cls.activeButton : ''}
            onClick={() => {
              handleGroupChange(tab?.value)
              setGroupLabel(tab?.label === "Barchasi" ? "" : tab?.label)
            }}
          >
            {tab?.label}
          </Button>
        ))}
        {groupOptions.length < 7 && (
          <WhiteButton onClick={() => setIsOpen(true)}>
            Guruh Qo'shish <PlusIcon fill='#9EA4B0' width={20} height={20} />
          </WhiteButton>
        )}
      </div>
      <CreateGroupForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleCreateGroup}
      />
    </div>
  )
}

export default MainMentorStudentsGroupTab
