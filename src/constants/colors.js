import { STUDENT_STATUS_ENUMS } from "./enum";

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
        color: "rgba(18, 86, 219, 0.8)",
        backgroundColor: "rgba(18, 86, 219, 0.1)",
        borderColor: 'rgba(18, 86, 219, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.NEW]: {
        color: 'rgba(39, 205, 2, 0.8)',
        backgroundColor: 'rgba(39, 205, 2, 0.1)', //
        borderColor: 'rgba(39, 205, 2, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.ACTIVE]: {
        color: 'rgba(39, 205, 2, 0.8)',
        backgroundColor: 'rgba(235, 250, 239, 1)',
        borderColor: 'rgba(214, 244, 222, 1)'
    },
    [STUDENT_STATUS_ENUMS.PAUSED]: {
        color: 'rgba(100, 2, 205, 0.8)',
        backgroundColor: 'rgba(100, 2, 205, 0.1)',
        borderColor: 'rgba(100, 2, 205, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.PROBLEMATIC]: {
        color: 'rgba(100, 2, 205, 0.8)',
        backgroundColor: 'rgba(100, 2, 205, 0.1)', //
        borderColor: 'rgba(100, 2, 205, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.TIME_OVER]: {
        color: "rgba(255, 51, 51, 0.8)",
        backgroundColor: "rgba(255, 51, 51, 0.1)",
        borderColor: 'rgba(255, 51, 51, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.WITHOUT_MENTOR]: {
        color: "rgba(255, 52, 219, 0.8)",
        backgroundColor: "rgba(255, 52, 219, 0.1)",
        borderColor: 'rgba(255, 52, 219, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.SUCCESS]: {
        color: "rgba(255, 210, 95, 0.8)",
        backgroundColor: "rgba(255, 210, 95, 0.1)",
        borderColor: 'rgba(255, 210, 95, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.CANCELED]: {
        color: "rgba(255, 52, 219, 0.8)",
        backgroundColor: "rgba(255, 52, 219, 0.1)",
        borderColor: 'rgba(255, 52, 219, 0.2)'
    },
    [STUDENT_STATUS_ENUMS.FINISHED]: {
        color: "rgba(39, 205, 2, 0.8)",
        backgroundColor: "rgba(39, 205, 2, 0.1)",
        borderColor: 'rgba(39, 205, 2, 0.2)'
    }
}