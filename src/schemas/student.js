import * as Yup from 'yup';
import { genderSchema, phoneNumberSchema } from '.';

export const studentInfoSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: phoneNumberSchema.required("Telefon raqam majburiy"),
    gender: genderSchema,
    birthday: Yup.string().nullable(),
})

export const connectionTimeSchema = Yup.object().shape({
    days: Yup.array().min(1, 'Bitta kunni tanlang').required('Bitta kunni tanlang'),
    connectionTime: Yup.string().matches(/^\d{2}:\d{2} - \d{2}:\d{2}$/, "To'gri vaqtni tanlang").required('Vaqtni yozing'),
})