import * as Yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const studentInfoSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: Yup.string().required("Telefon raqam majburiy").test('valid-phone', "Telefon raqamni to'liq kiriting", (value) => isValidPhoneNumber(value)),
    gender: Yup.number().oneOf([0, 1], 'Jinsini tanlang').required('Jinsini tanlash majburiy'),
    birthday: Yup.string().nullable(),
})

export const connectionTimeSchema = Yup.object().shape({
    days: Yup.array().min(1, 'Bitta kunni tanlang').required('Bitta kunni tanlang'),
    connectionTime: Yup.string().matches(/^\d{2}:\d{2} - \d{2}:\d{2}$/, "To'gri vaqtni tanlang").required('Vaqtni yozing'),
})