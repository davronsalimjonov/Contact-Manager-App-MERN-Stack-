import { EMPLOYEE_ROLES } from "@/constants/enum"
import { MessageTypes } from "@/constants/enum"

export const getMessageOwner = (message) => {
    let owner = null
    const messageType = message?.type 

    if(messageType === MessageTypes.MESSAGE) {
        owner = message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user
    } else if(messageType === MessageTypes.COMMENT) {
        owner = message?.comment?.createdBy === EMPLOYEE_ROLES.SELLER ? message?.comment?.salesManager : message?.comment?.owner 
    } else if(messageType === MessageTypes.TASK) {
        owner = message?.task?.createdBy === EMPLOYEE_ROLES.SELLER ? message?.task?.salesManager : message?.task?.mentor
    } else if(messageType === MessageTypes.STUDENT_HOME_WORK) {
        owner = message?.studentHomeWork?.student?.user
    } else if(messageType === MessageTypes.SMS) {
        owner = message?.sms?.sender
    } else if(messageType === MessageTypes.LESSON_TASK) {
        owner = message?.homeTask?.mentor
    } else if(messageType === MessageTypes.LESSON_HOME_WORK){
        owner = message?.lessonHomeWork?.user
    }

    return owner
}