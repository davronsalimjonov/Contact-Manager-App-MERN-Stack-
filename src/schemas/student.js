import * as Yup from 'yup';

export const studentInfoSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: Yup.string().required('Телефон обязателен').matches(/^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/, 'Номер должен быть в формате +998 (XX) XXX-XX-XX и полностью заполнен'),
    gender: Yup.number().oneOf([0, 1], 'Пол должен быть либо 0, либо 1').required('Пол обязателен')
})