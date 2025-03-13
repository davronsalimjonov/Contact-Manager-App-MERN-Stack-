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
  });