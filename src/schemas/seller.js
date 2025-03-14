import * as Yup from 'yup'
import { genderSchema, phoneNumberSchema } from '.'

export const saleFormSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: phoneNumberSchema
      .required("Telefon raqam majburiy"),
    secondPhone: phoneNumberSchema,
    thirdPhone: phoneNumberSchema,
    telegram: Yup.string().required('Telegram raqam majburiy'),
    course: Yup.string().required('Kurs tanlash majburiy'),
    month: Yup.number().required('Oy tanlash majburiy'),
    gender: genderSchema,
    userType: Yup.string().required('O\'quvchi turi tanlash majburiy'),
    paymentType: Yup.string().required('To\'lov turi tanlash majburiy'),
    paymentAmount: Yup.string().required('Summa kiritish majburiy'),
    file: Yup.mixed().required('Chekni yuklash majburiy'),
    date: Yup.date().required('Sanani kiritish majburiy'),
    comment: Yup.string(),
  });