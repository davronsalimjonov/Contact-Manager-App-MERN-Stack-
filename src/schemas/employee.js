import * as Yup from 'yup'
import { genderSchema, phoneNumberSchema } from '.'

export const employeeSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: phoneNumberSchema.required("Telefon raqam majburiy"),
    gender: genderSchema,
    birthday: Yup.date().required("Tug'ilgan sanani tanlang").test('min-age', 'Yosh 7 dan katta bo‘lishi kerak',
        function (value) {
            if (!value) return true; 
            const today = new Date();
            const minDate = new Date(today.getFullYear() - 7, today.getMonth(), today.getDate());
            return value <= minDate;
        }
    ),
    degree: Yup.string().required('Til bilish darajasini tanlang')
})