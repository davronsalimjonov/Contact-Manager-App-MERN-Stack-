import * as Yup from 'yup'

// export const courseChema = Yup.object().shape({
//     title: Yup.string().required('Kurs nomi kiritilsin'),
//     description: Yup.string().required(`Kurs haqida ma'lumot kiritilsin`),
//     link: Yup.string().required(`Link kiritilsin`),
//     paymentLink: Yup.string().required(`Payment link kiritilsin`),
//     paymentsLinks: Yup.array().string(''),
//     image: Yup.string('')
// })


export const singleStudentCourseSchema = Yup.object().shape({
    "course": Yup.string().required('Kursni tanlash majburiy'),
    "startDate": Yup.string().required('Kursni boshlanish sanasini kiritish majburiy'),
    "endDate": Yup.string().required('Kursni tugash vaqti kiritish majburiy'),
    "login": Yup.string().required('Loginni kiritish majburiy'),
    "password": Yup.string().required('Parolni kiritish majburiy'),
    "teacher": Yup.string().required('Mentorni tanlash majburiy'),
    "secondTeacher": Yup.string().required('Yordamchi mentorni tanlash majburiy'),
    "status": Yup.string().required('Statusni tanlash majburiy'),
    "level": Yup.string().required('O\'quvchi darajasini tanlash majburiy'),
})