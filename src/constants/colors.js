import { EMPLOYEE_STATUS_ENUM, STUDENT_STATUS_ENUMS } from "./enum";

export const LEVEL_COLORS = {
    'A1': {
        color: 'rgba(18, 86, 219, 0.8)',
        backgroundColor: 'rgba(18, 86, 219, 0.1)',
        borderColor: 'rgba(18, 86, 219, 0.2)'
    },
    'A2': {
        color: 'rgba(39, 205, 2, 0.8)',
        backgroundColor: 'rgba(39, 205, 2, 0.1)',
        borderColor: 'rgba(39, 205, 2, 0.2)'
    },
    'B1': {
        color: 'rgba(100, 2, 205, 0.8)',
        backgroundColor: 'rgba(100, 2, 205, 0.1)',
        borderColor: 'rgba(100, 2, 205, 0.2)'
    },
    'B2': {
        color: 'rgba(255, 51, 51, 0.8)',
        backgroundColor: 'rgba(255, 51, 51, 0.1)',
        borderColor: 'rgba(255, 51, 51, 0.2)'
    },
    'C1': {
        color: 'rgba(255, 52, 219, 0.8)',
        backgroundColor: 'rgba(255, 52, 219, 0.1)',
        borderColor: 'rgba(255, 52, 219, 0.2)'
    },
    'C2': {
        color: 'rgba(255, 210, 95, 0.8)',
        backgroundColor: 'rgba(255, 210, 95, 0.1)',
        borderColor: 'rgba(255, 210, 95, 0.2)'
    },
    DEFAULT_COLOR: 'rgba(206, 242, 203, 1)',
    BUSY_COLOR: 'rgba(255, 242, 242, 1)',
    ACTIVE_COLOR: 'rgba(206, 242, 203, 1)'
}

export const STATUS_COLORS = {
    [STUDENT_STATUS_ENUMS.ADAPTATION]: {
        color: "rgba(151, 2, 205, 1)",
        backgroundColor: "rgba(151, 2, 205, 0.09)",
        borderColor: 'rgba(151, 2, 205, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.NEW]: {
        color: 'rgba(205, 171, 2, 1)',
        backgroundColor: 'rgba(205, 171, 2, 0.09)',
        borderColor: 'rgba(205, 171, 2, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.ACTIVE]: {
        color: 'rgba(39, 205, 2, 1)',
        backgroundColor: 'rgba(39, 205, 2, 0.09)',
        borderColor: 'rgba(39, 205, 2, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.PAUSED]: {
        color: 'rgba(2, 171, 205, 1)',
        backgroundColor: 'rgba(2, 171, 205, 0.09)',
        borderColor: 'rgba(2, 171, 205, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.PROBLEMATIC]: {
        color: 'rgba(255, 52, 55, 1)',
        backgroundColor: 'rgba(255, 52, 55, 0.09)',
        borderColor: 'rgba(255, 52, 55, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.TIME_OVER]: {
        color: "rgba(255, 52, 219, 1)",
        backgroundColor: "rgba(255, 52, 219, 0.09)",
        borderColor: 'rgba(255, 52, 219, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.WITHOUT_MENTOR]: {
        color: "rgba(18, 86, 219, 1)",
        backgroundColor: "rgba(18, 86, 219, 0.09)",
        borderColor: 'rgba(18, 86, 219, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.SUCCESS]: {
        color: "rgba(255, 214, 0, 1)",
        backgroundColor: "rgba(255, 214, 0, 0.09)",
        borderColor: 'rgba(255, 214, 0, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.CANCELED]: {
        color: "rgba(205, 120, 2, 1)",
        backgroundColor: "rgba(205, 120, 2, 0.09)",
        borderColor: 'rgba(205, 120, 2, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.FINISHED]: {
        color: "rgba(43, 2, 205, 1)",
        backgroundColor: "rgba(43, 2, 205, 0.09)",
        borderColor: 'rgba(43, 2, 205, 0.2)'
    }
}

export const EMPLOYEE_STATUS_COLORS = {
    [EMPLOYEE_STATUS_ENUM.ACTIVE]: {
        color: 'rgba(39, 205, 2, 1)',
        backgroundColor: 'rgba(39, 205, 2, 0.09)'
    },
    [EMPLOYEE_STATUS_ENUM.PAUSED]: {
        color: 'rgba(18, 86, 219, 1)',
        backgroundColor: 'rgba(18, 86, 219, 0.09)'
    },
    [EMPLOYEE_STATUS_ENUM.QUIT]: {
        color: 'rgba(255, 0, 0, 1)',
        backgroundColor: 'rgba(255, 0, 0, 0.09)'
    },
    [EMPLOYEE_STATUS_ENUM.TRIAL_PERIOD]: {
        color: 'rgba(228, 191, 0, 1)',
        backgroundColor: 'rgba(228, 191, 0, 0.09)'
    }
}