import { BreifcaseIcon, FlagIcon, HomePinIcon, MailIcon, SchoolOutlineIcon, StarsIcon } from '../../atoms/icons';
import StudentInfoRow from '../../moleculs/StudentInfoRow';
import cls from './StudentPersonalInfo.module.scss';

const StudentPersonalInfo = ({
    email = '',
    direction = '',
    purpose = '',
    level = '',
    address = '',
    job = ''
}) => {
    return (
        <div className={cls.info}>
            <h2 className={cls.info__title}>Shaxsiy ma’lumotlari</h2>
            <div className={cls.info__card}>
                <StudentInfoRow icon={<SchoolOutlineIcon />} label='Yo’nalishi:' value={direction} />
                <StudentInfoRow icon={<FlagIcon />} label='Maqsadi:' value={purpose} />
                <StudentInfoRow icon={<StarsIcon />} label='Darajasi:' value={level} />
                <StudentInfoRow icon={<HomePinIcon />} label='Yashash manzili:' value={address} />
                <StudentInfoRow icon={<BreifcaseIcon />} label='Kasbi:' value={job} />
                <StudentInfoRow icon={<MailIcon />} label='Email:' value={email} />
            </div>
        </div>
    );
}

export default StudentPersonalInfo;