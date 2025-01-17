import * as Yup from 'yup'
import { genderSchema, phoneNumberSchema } from '.'

export const employeeSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: phoneNumberSchema.required("Telefon raqam majburiy"),
    gender: genderSchema,
    birthday: Yup.date()
    .nullable()
    .test(
        'min-age',
        'Yosh 7 dan katta bo‘lishi kerak',
        function (value) {
            if (!value) return true; // Поле необязательное, пропускаем проверку для пустого значения.
            const today = new Date();
            const minDate = new Date(today.getFullYear() - 7, today.getMonth(), today.getDate());
            return value <= minDate; // Проверяем, что дата рождения меньше или равна минимальной дате.
        }
    ),
    degree: Yup.string().required('Til bilish darajasini tanlang')
})