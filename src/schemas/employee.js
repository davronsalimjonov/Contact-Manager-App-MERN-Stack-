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

export const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Eski parolni kiriting"),
    newPassword: Yup.string()   
        .required("Yangi parolni kiriting"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Parollar mos kelmadi")
        .required("Parolni qayta kiriting"),
});

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
    passport: Yup.string().test("is-complete", "Passport seriyasini toliq kiriting", (value) => value ? !value.includes("_") : true).nullable(),
    sip: Yup.string().test("is-complete", "SIP raqamini toliq kiriting", (value) => value ? !value.includes("_") : true).nullable(),
    amocrmId: Yup.string().test("is-complete", "Amo CRM ID raqamini toliq kiriting", (value) => value ? !value.includes("_") : true).nullable(),
})

export const createSellerSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),  
    lastName: Yup.string().required('Familiya kiritish majburiy'),  
    phone: phoneNumberSchema.required("Telefon raqam majburiy"),
    gender: genderSchema,
    birthday: birthdaySchema,
    passport: Yup.string().test("is-complete", "Passport seriyasini toliq kiriting", (value) => value ? !value.includes("_") : true).nullable(),
    sip: Yup.string().test("is-complete", "SIP raqamini toliq kiriting", (value) => value ? !value.includes("_") : true).nullable(),
    amocrmId: Yup.string().test("is-complete", "Amo CRM ID raqamini toliq kiriting", (value) => value ? !value.includes("_") : true).nullable(),
    salesGroup: Yup.string().required('Guruhni tanlash majburiy')
})