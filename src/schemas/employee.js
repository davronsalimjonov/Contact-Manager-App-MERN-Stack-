import * as Yup from 'yup'
import { genderSchema, phoneNumberSchema } from '.'

export const employeeSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: phoneNumberSchema,
    gender: genderSchema,
    birthday: Yup.string().nullable(),
    degree: Yup.string().required('Til bilish darajasini tanlang')
})