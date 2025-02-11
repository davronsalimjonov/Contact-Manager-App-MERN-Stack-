import * as Yup from 'yup'
import { birthdaySchema, genderSchema, phoneNumberSchema } from '.'

export const employeeSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: phoneNumberSchema.required("Telefon raqam majburiy"),
    gender: genderSchema,
    birthday: birthdaySchema,
    degree: Yup.string().required('Til bilish darajasini tanlang')
})

export const mentorSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),  
    lastName: Yup.string().required('Familiya kiritish majburiy'),  
    phone: phoneNumberSchema.required("Telefon raqam majburiy"),
    gender: genderSchema,
    birthday: birthdaySchema,
    degree: Yup.string().required('Til bilish darajasini tanlang'),
    // sip: Yup.number().required('SIP raqamini kiritish majburiy'),
    role: Yup.string().required('Rolni tanlash majburiy')  
})