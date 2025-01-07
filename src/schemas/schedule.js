import * as Yup from 'yup';
export const scheduleSchema = Yup.object().shape({
    degree: Yup.string().required('Darajani kiritish majburiy'),
    weekday: Yup.string().required('Hafta kunini kiritish majburiy'),
    time: Yup.string().required('Boshlanish vaqtini kiritish majburiy'),
    endTime: Yup.string().required('Boshlanish vaqtini kiritish majburiy'),
})