import { generateTimeOptions } from "@/utils/time";
import { USER_ROLES } from ".";
import { EMPLOYEE_STATUS_ENUM, SALE_TYPE, USER_TYPE_ENUMS } from "./enum";

export const GENDER_OPTIONS = [
    { value: '1', label: 'Erkak' },
    { value: '0', label: 'Ayol' },
]

export const DAY_OF_WEEK_OPTIONS = [
    { value: 1, label: 'Du' },
    { value: 2, label: 'Se' },
    { value: 3, label: 'Cho' },
    { value: 4, label: 'Pa' },
    { value: 5, label: 'Ju' },
    { value: 6, label: 'Sha' },
    { value: 0, label: 'ya' },
]

export const MONTH_OPTIONS = [
    { value: '1', label: 'Yanvar' },
    { value: '2', label: 'Fevral' },
    { value: '3', label: 'Mart' },
    { value: '4', label: 'Aprel' },
    { value: '5', label: 'May' },
    { value: '6', label: 'Iyun' },
    { value: '7', label: 'Iyul' },
    { value: '8', label: 'Avgust' },
    { value: '9', label: 'Sentabr' },
    { value: '10', label: 'Oktabr' },
    { value: '11', label: 'Noyabr' },
    { value: '12', label: 'Dekabr' },
];

export const ENGLISH_LEVEL_OPTIONS = [
    { value: 'A1', label: 'A1' },
    { value: 'A2', label: 'A2' },
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'C1', label: 'C1' },
    { value: 'C2', label: 'C2' },
]

export const WEEKDAY_OPTIONS = [
    { value: 1, label: 'Dushanba' },
    { value: 2, label: 'Seshanba' },
    { value: 3, label: 'Chorshanba' },
    { value: 4, label: 'Payshanba' },
    { value: 5, label: 'Juma' },
    { value: 6, label: 'Shanba' },
    { value: '0', label: 'Yakshanba' },
]

export const LESSON_TIME_OPTIONS = generateTimeOptions()

export const MENTOR_TYPES = [
    { label: 'Nazoratchi Mentor', value: USER_ROLES.CALL_MENTOR },
    { label: 'Asosiy Mentor', value: USER_ROLES.MAIN_MENTOR },
]

export const USER_TYPE_OPTIONS = [
    { label: 'O\'quvchi', value: USER_TYPE_ENUMS.STUDENT },
    { label: 'Free', value: USER_TYPE_ENUMS.FREE },
]

export const MENTOR_STATUS_OPTIONS = [
    { label: 'Sinovda', value: EMPLOYEE_STATUS_ENUM.TRIAL_PERIOD },
    { label: 'Ishlayapti', value: EMPLOYEE_STATUS_ENUM.ACTIVE },
    { label: 'Vaqtincha Ta`tilda', value: EMPLOYEE_STATUS_ENUM.PAUSED },
    { label: 'Ishdan Ketdi', value: EMPLOYEE_STATUS_ENUM.QUIT },
]

export const SALE_TYPE_OPTIONS = [
    { label: 'Yangi', value: SALE_TYPE.NEW },
    { label: 'Qayta sotuv', value: SALE_TYPE.RESALE },
    { label: 'Sarafan', value: SALE_TYPE.SARAFAN },
    { label: 'Qolgan to`lov', value: SALE_TYPE.REMAINING_PAYMENT },
]

export const PAYMENT_TYPE_OPTIONS = [
    { label: 'Uzum-3', value: 'uzum-3' },
    { label: 'Uzum-6', value: 'uzum-6' },
    { label: 'Uzum-12', value: 'uzum-12' },
    { label: 'Anor-6', value: 'anor-6' },
    { label: 'Alif-6', value: 'alif-6' },
    { label: 'Click', value: 'click' },
    { label: 'Karta', value: 'karta' },
    { label: 'Bank', value: 'bank' },
    { label: 'Paylater-3', value: 'paylater-3' },
    { label: 'Paylater-6', value: 'paylater-6' },
    { label: 'Paylater-9', value: 'paylater-9' },
    { label: 'Paylater-12', value: 'paylater-12' },
]