
export const MessageTypes = {
    MESSAGE: 'message',
    SMS: 'sms',
    CALL: 'call',
    IMAGE: 'image',
    VOISE: 'voice',
    AUDIO: 'audio',
    VIDEO: 'video',
    ANY_FILE: 'any',
    TEXT: 'text',
    TASK: 'task',
    COMMENT: 'comment',
    DATE_SEPARATOR: 'date_separator',
    LESSON_TASK: 'home-task',
    STUDENT_HOME_WORK: 'student-home-work',
    LESSON_HOME_WORK: 'lesson-home-work',
}

export const HomeLessonTaskStatus = {
    SEND: 'send',
    DONE: 'done',
    CHECKED: 'checked'
}

export const WORKSPACE_STATUS = {
    NOT_CONNECTED: 'not-connected',
    CALL_BACK: 'call-back',
    NOT_ANSWERED: 'not-answered',
    CONNECTED: 'connected',
}

export const ADAPTATION_WORKSPACE_STATUS = {
    NEW: 'new',
    LEVEL_DETECTED: 'level-detected',
    ADAPTATION_COMPLETED: 'adaptation-completed',
    NOT_RESPONDED: 'not-responded',
    ISSUE: 'issue',
    PAUSED: 'paused'
}

export const GROUP_STATUS = {
    ACTIVE: 'active',
    COLLECTING: 'collecting',
    CLOSED: 'closed'
}

export const USER_TYPE_ENUMS = {
    FREE: 'Free',
    STUDENT: 'O\'quvchi'
}

export const MENTOR_STATUS_ENUM = {
    TRIAL_PERIOD: 'Sinovda',
    ACTIVE: 'Ishlayapti',
    PAUSED: 'Vaqtincha Ta`tilda',
    QUIT: 'Ishdan Ketdi'
}

export const MENTOR_CARDS_ENUM ={
    FINE: 'red',
    WARNING: 'yellow',
    BONUS: 'green'
}

export const STUDENT_STATUS_ENUMS = {
    NEW: 'Yangi',
    ADAPTATION: 'Adaptatsiya',
    PAUSED: 'Pauza',
    FINISHED: 'Bitirdi',
    CANCELED: 'Bekor qilindi',
    ACTIVE: 'O\'qiyapti',
    PROBLEMATIC: 'Muammoli',
    TIME_OVER: 'Vaqti tugadi',
    WITHOUT_MENTOR: 'Mentorsiz',
    SUCCESS: 'Muvaffaqiyatli'
}

export const LESSON_STATUS_ENUMS = {
    ONGOING: 'ongoing',
    FINISHED: 'finished'
}

export const SALE_TYPE = {
    RESALE: 'resale',
    SARAFAN: 'sarafan',
    REMAINING_PAYMENT: 'remaining-payment',
    NEW: 'new'
}