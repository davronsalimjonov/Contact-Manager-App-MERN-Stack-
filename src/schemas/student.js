import * as Yup from 'yup';
import { genderSchema, phoneNumberSchema } from '.';

export const studentInfoSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: phoneNumberSchema,
    gender: genderSchema,
    birthday: Yup.string().nullable(),
})

export const connectionTimeSchema = Yup.object().shape({
    days: Yup.array().min(1, 'Bitta kunni tanlang').required('Bitta kunni tanlang'),
    connectionTime: Yup.string().matches(/^\d{2}:\d{2} - \d{2}:\d{2}$/, "To'gri vaqtni tanlang").required('Vaqtni yozing'),
})

export const courseSchema = Yup.object().shape({
    title: Yup.string().required('Kurs nomini kiritish majburiy'),
    link: Yup.string().required('Kurs linkini kiritish majburiy'),
    paymentLink: Yup.string(),
    paymentLinks: Yup.array().min(1, 'To\'lov linkini tanlash majburiy').required('required'),
    description: Yup.string().required('Description kiritish majburiy'),
    image: Yup.string(),
})

export const discountSchema = Yup.object().shape({
    "price": Yup.string().required('Kurs narxini kiritish majburiy'),
    "month": Yup.number().required('Kurs oyini kiritish majburiy'),
    "discount": Yup.string().required('Kurs chegirmasini kiritish majburiy'),
    "discountDate": Yup.array().of(Yup.string()).required('Chegirma sanasini kiritish majburiy'),
    // "discountPrice": Yup.string().required('Kurs chegirmadagi narxi kiritish majburiy'),
    "discountTime": Yup.string().required('Chegirma tugash soatini kiritish majburiy'),
    "description": Yup.string().required('Description kiritish majburiy'),
})

