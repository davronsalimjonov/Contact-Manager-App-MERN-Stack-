import * as Yup from 'yup';

export const studentInfoSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: Yup.string().required('Telefon raqam majburiy').matches(/^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/, "Raqam +998 (XX) XXX-XX-XX formatida bo'lishi va to'liq to'ldirilgan bo'lishi kerak"),
    gender: Yup.number().oneOf([0, 1], 'Jinsini tanlang').required('Jinsini tanlash majburiy'),
    birthday: Yup.string().required('Tug’ilgan sana majburiy'),
})