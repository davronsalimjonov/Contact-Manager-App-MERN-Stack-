import * as Yup from 'yup';

export const studentInfoSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: Yup.string().required('Telefon raqam majburiy').test(
      'phoneNumber-length',
      "Telefon raqamni to'liq kiriting",
      (value) => !value || value.replace(/\D/g, '').length === 12
    ),
    gender: Yup.number().oneOf([0, 1], 'Jinsini tanlang').required('Jinsini tanlash majburiy'),
    birthday: Yup.string().nullable(),
})