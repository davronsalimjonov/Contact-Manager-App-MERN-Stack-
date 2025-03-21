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

export const sellerSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),  
    lastName: Yup.string().required('Familiya kiritish majburiy'),  
    phone: phoneNumberSchema.required("Telefon raqam majburiy"),
    gender: genderSchema,
    birthday: birthdaySchema,
    passport: Yup.string().test("is-complete", "Passport seriyasini toliq kiriting", (value) => value ? !value.includes("_") : false),
    sip: Yup.string().test("is-complete", "SIP raqamini toliq kiriting", (value) => value ? !value.includes("_") : false).required('SIP raqamini kiritish majburiy'),
    amocrmId: Yup.string().test("is-complete", "Amo CRM ID raqamini toliq kiriting", (value) => value ? !value.includes("_") : false).required('Amo CRM ID raqamini kiritish majburiy'),
})