
export const daysOfWeekFull = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

export const daysOfWeekShort = ['Ya', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha'];

export const STUDENT_STATUS_ENUMS = ['Yangi', 'Adaptatsiya', "O'qiyapti", 'Pauza', 'Muammoli', 'Vaqti tugadi', 'Bitirdi', 'Bekor qilindi', 'Mentorsiz', 'Muvaffaqiyatli'];

export const WORKSPACE_ENUMS = ['not-connected', 'call-back', 'not-answered', 'connected', 'filled-form', 'level-determined', 'attached-to-the-teacher']

export const GROUPS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const CALL_RECORD_DEFAULT_PEAKS = Array(300).fill(0)

export const UNITS = Array.from(Array(12)).map((_, index) => ({ value: 5 * (index + 1), label: `Unit ${5 * (index + 1)}` }));

export const DEGREE = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const STATUSOPTIONS = STUDENT_STATUS_ENUMS.map((status) => ({ value: status, label: status }))

export const DEGREEOPTIONS = DEGREE.map((level) => ({ value: level, label: level }));

export const STUDENTS_STATUS_OPTIONS = STUDENT_STATUS_ENUMS.map((status) => ({ value: status, label: status }));

const paymentLink = import.meta.env.VITE_APP_PAYMENT_LINK;

export const PAYMENT_LINK = [
    {
        label: 'Click',
        value: paymentLink,
    }
]

export const MEDIA_FILES_TYPES = 'image/*, application/pdf, video/*, audio/*, .doc, .docx'