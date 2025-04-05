import * as Yup from 'yup'
import { birthdaySchema, genderSchema, phoneNumberSchema } from '.'

export const qualityControlEmployeeSchema = Yup.object().shape({   
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: phoneNumberSchema.required("Telefon raqam majburiy"),
    birthday: birthdaySchema,
    gender: genderSchema
})

export const qualityControlEmployeeSettingsSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: phoneNumberSchema.required("Telefon raqam majburiy"),
    birthday: birthdaySchema,
    gender: genderSchema,
    status: Yup.string().required('Statusni tanlash majburiy')
})