
export const daysOfWeekFull = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

export const daysOfWeekShort = ['Ya', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha'];

export const STUDENT_STATUS_ENUMS = ['Yangi', 'Adaptatsiya', "O'qiyapti", 'Pauza', 'Muammoli', 'Vaqti tugadi', 'Bitirdi', 'Bekor qilindi', 'Mentorsiz', 'Muvaffaqiyatli'];

export const WORKSPACE_ENUMS = ['not-connected', 'call-back', 'not-answered', 'connected', 'filled-form', 'level-determined', 'attached-to-the-teacher']

export const CALL_RECORD_DEFAULT_PEAKS = Array(300).fill(0);

export const UNITS = Array.from(Array(12)).map((_, index) => ({ value: 5 * (index + 1), label: `Unit ${5 * (index + 1)}` }));

export const DEGREE = [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2"
];

export const DEGREEOPTIONS = DEGREE.map((level) => ({ value: level, label: level }));

export const STUDENTS_STATUS_OPTION = STUDENT_STATUS_ENUMS.map((status) => ({
    value: status, label: status
}));

export const STATUS_COLOR = [
    {
        status: "Adaptatsiya",
        backgroundColor: "rgba(0, 182, 155, 0.15)",
        color: "rgba(0, 182, 155)"
    },
    {
        status: "Yangi",
        backgroundColor: "rgba(40, 40, 40, 0.1)",
        color: "rgba(40, 40, 40)"
    },
    {
        status: "O'qiyapti",
        backgroundColor: "rgba(255, 196, 3, 0.08)",
        color: "rgba(255, 196, 3, 1)"
    },
    {
        status: "Pauza",
        backgroundColor: "rgba(18, 86, 219, 0.2)",
        color: "rgba(18, 86, 219, 1)"
    },
    {
        status: "Muammoli",
        backgroundColor: "rgba(130, 128, 255, 0.3)",
        color: "rgba(130, 128, 255, 1)"
    },
    {
        status: "Vaqti tugadi",
        backgroundColor: "rgba(255, 216, 204, 1)",
        color: "rgba(219, 52, 0, 1)"
    },
    {
        status: "Bitirdi",
        backgroundColor: "rgba(255, 52, 219, 0.2)",
        color: "rgba(255, 52, 219, 1)"
    },
    {
        status: "Bekor qilindi",
        backgroundColor: "rgba(232, 251, 223, 1)",
        color: "rgba(79, 239, 5, 1)"
    },
    {
        status: "Mentorsiz",
        backgroundColor: "rgba(218, 255, 254, 1)",
        color: "rgba(0, 191, 186, 1)"
    },
    {
        status: "Muvaffaqiyatli",
        backgroundColor: "rgba(255, 212, 227, 1)",
        color: "rgba(205, 0, 71, 1)"
    }
]
