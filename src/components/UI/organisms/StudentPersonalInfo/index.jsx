import { BreifcaseIcon, FlagIcon, HomePinIcon, MailIcon, SchoolOutlineIcon, StarsIcon } from '../../atoms/icons';
import StudentInfoRow from '../../moleculs/StudentInfoRow';
import cls from './StudentPersonalInfo.module.scss';

const StudentPersonalInfo = () => {
    return (
        <div className={cls.info}>
            <h2 className={cls.info__title}>Shaxsiy ma’lumotlari</h2>
            <div className={cls.info__card}>
                <StudentInfoRow icon={<SchoolOutlineIcon />} label='Yo’nalishi:' value='General English' />
                <StudentInfoRow icon={<FlagIcon />} label='Maqsadi:' value='Sayohat uchun' />
                <StudentInfoRow icon={<StarsIcon />} label='Darajasi:' value='A1(endi boshlayapman)' />
                <StudentInfoRow icon={<HomePinIcon />} label='Yashash manzili:' value='Navoiy' />
                <StudentInfoRow icon={<MailIcon />} label='Email:' value='diyorashomamatova3@gmail.com' />
            </div>
        </div>
    );
}

export default StudentPersonalInfo;