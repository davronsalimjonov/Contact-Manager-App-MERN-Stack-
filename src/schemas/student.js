import { isValidPhoneNumber } from 'libphonenumber-js';
import * as Yup from 'yup';

export const studentInfoSchema = Yup.object().shape({
    firstName: Yup.string().required('Ism kiritish majburiy'),
    lastName: Yup.string().required('Familiya kiritish majburiy'),
    phone: Yup.string().required("Telefon raqam majburiy").test('valid-phone', "Telefon raqamni to'liq kiriting", (value) => isValidPhoneNumber(value)),
    gender: Yup.number().oneOf([0, 1], 'Jinsini tanlang').required('Jinsini tanlash majburiy'),
    birthday: Yup.string().nullable(),
})