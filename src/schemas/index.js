import * as Yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { GENDER_OPTIONS } from '@/constants/form';

export const phoneNumberSchema = Yup.string().test('valid-phone', "Telefon raqamni to'liq kiriting", (value) => value ? isValidPhoneNumber(value) : true)
export const genderSchema = Yup.string().oneOf(GENDER_OPTIONS.map(option => option.value), 'Jinsini tanlang').required('Jinsini tanlash majburiy')