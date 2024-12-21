import React, { useState } from 'react'
import WhiteButton from '../../atoms/Buttons/WhiteButton'
import Button from '../../atoms/Buttons/Button'
import Dialog from '../../moleculs/Dialog'
import RedButton from '../../atoms/Buttons/RedButton'
import Select from '../../atoms/Form/Select'
import cls from './MainMentorStudentsGroupTab.module.scss'
import FormInput from '../../moleculs/Form/FormInput'

const MainMentorStudentsGroupTab = ({
    groups,
    handleGroupNameChange,
    handleMentorChange,
    handleCreateGroup,
    callMentorOptions,
    groupName='',
    setGroupName,
    selectedMentor=null, 
    setGroupId,
    setIsFetched
  }) => {
  const [isModal, setIsModal] = useState(false)
  const [activeGroup, setActiveGroup] = useState('Barchasi') 

  const tabOptions = [
    { value: '', label: 'Barchasi' },
  ]

  groups?.forEach(group => {
      tabOptions.push({ value: group.id, label: group.title })
  })

  return (
    <div className={cls.MainMentorStudentsGroupTab}>
      <div className={cls.MainMentorStudentsGroupTab__tabs}>
        {tabOptions.map((tab) => (
          <Button
            key={`tab-${tab?.label}`}
            className={activeGroup === `${tab?.label}` ? cls.activeButton : cls.inactiveButton}
            onClick={() => {
              setActiveGroup(`${tab?.label}`)
              setIsFetched(true)
              tab?.label === "Barchasi" ? setGroupName('') : setGroupName(tab?.label)
              tab?.label === "Barchasi" ? setGroupId('') : setGroupId(tab?.value)
            }} 
            value={tab?.value}
          >
            {tab?.label}
          </Button>
        ))}
        <WhiteButton onClick={() => setIsModal(true)} className={cls.MainMentorStudentsGroupTab__tabs__whiteBtn}>
          Guruh Qo'shish
          <span>+</span>
        </WhiteButton>
      </div>
      <Dialog isOpen={isModal} onClose={() => setIsModal(false)}>
        <form className={cls.MainMentorStudentsGroupTab__dialog}>
          <div>
            <div>
              <label htmlFor="select">Guruh Qo'shish</label>
              <FormInput
                placeholder='Guruh Nomini Yozing'
                isClearable
                value={groupName}
                onChange={handleGroupNameChange}
              />
            </div>
            <div>
              <label htmlFor="select">Nazoratchi Mentor</label>
              <Select
                placeholder='Nazoratchi Mentorni Tanlang'
                options={callMentorOptions}
                value={selectedMentor}
                onChange={handleMentorChange}
                isClearable
              />
            </div>
          </div>
          <div className={cls.MainMentorStudentsGroupTab__dialog__buttons}>
            <RedButton onClick={() => setIsModal(false)}>Bekor Qilish</RedButton>
            <Button onClick={handleCreateGroup}>Qo'shish</Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}

export default MainMentorStudentsGroupTab
