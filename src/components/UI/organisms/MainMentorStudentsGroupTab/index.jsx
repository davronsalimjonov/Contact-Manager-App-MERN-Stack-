import React, { useState } from 'react'
import WhiteButton from '../../atoms/Buttons/WhiteButton'
import Button from '../../atoms/Buttons/Button'
import Dialog from '../../moleculs/Dialog'
import RedButton from '../../atoms/Buttons/RedButton'
import { GROUPS, STUDENT_STATUS_ENUMS } from '@/constants'
import Select from '../../atoms/Form/Select'
import cls from './MainMentorStudentsGroupTab.module.scss'

const MainMentorStudentsGroupTab = () => {
  const [isModal, setIsModal] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState([]) // State to store added groups
  const [selectedGroup, setSelectedGroup] = useState(null) // State for the group selected in the modal
  const [activeGroup, setActiveGroup] = useState('all') // Tracks the currently active button, defaulting to "Barchasi"

  const statusOptions = STUDENT_STATUS_ENUMS.map((status) => ({ value: status, label: status }))
  const studentGroups = GROUPS.map((group) => ({ value: group, label: group }))

  const handleAddGroup = () => {
    if (selectedGroup && !selectedGroups.some((group) => group.value === selectedGroup.value)) {
      setSelectedGroups((prev) => [...prev, selectedGroup])
    }
    setIsModal(false)
    setSelectedGroup(null)
  }

  return (
    <div className={cls.MainMentorStudentsGroupTab}>
      <div className={cls.MainMentorStudentsGroupTab__tabs}>
        {/* Barchasi button */}
        <Button
          className={activeGroup === 'all' ? cls.activeButton : cls.inactiveButton}
          onClick={() => setActiveGroup('all')} // Set "all" as active
        >
          Barchasi
        </Button>

        {/* Render group buttons */}
        {selectedGroups.map((group) => (
          <button
            key={group.value}
            className={
              activeGroup === group.value
                ? cls.activeButton // Active style
                : cls.inactiveButton // Inactive style
            }
            onClick={() => setActiveGroup(group.value)} // Set the clicked group as active
          >
            {group.label}
          </button>
        ))}

        {/* Guruh Qo'shish (Add Group) button */}
        <WhiteButton onClick={() => setIsModal(true)} className={cls.MainMentorStudentsGroupTab__tabs__whiteBtn}>
          Guruh Qo'shish
          <span>+</span>
        </WhiteButton>
      </div>

      {/* Modal */}
      <Dialog isOpen={isModal} onClose={() => setIsModal(false)}>
        <div className={cls.MainMentorStudentsGroupTab__dialog}>
          <div>
            <div>
              <label htmlFor="select">Guruh Qo'shish</label>
              <Select
                placeholder='Guruh Nomini Yozing'
                options={studentGroups}
                isClearable
                value={selectedGroup}
                onChange={setSelectedGroup}
              />
            </div>
            <div>
              <label htmlFor="select">Nazoratchi Mentor</label>
              <Select
                placeholder='Nazoratchi Mentorni Tanlang'
                options={statusOptions}
                isClearable
              />
            </div>
          </div>
          <div className={cls.MainMentorStudentsGroupTab__dialog__buttons}>
            <RedButton onClick={() => setIsModal(false)}>Bekor Qilish</RedButton>
            <Button onClick={handleAddGroup}>Qo'shish</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default MainMentorStudentsGroupTab
