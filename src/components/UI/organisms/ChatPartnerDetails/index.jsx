import StudentStatusPicker from '../StudentStatusPicker';
import ChatSidebarAccordion from '../../moleculs/ChatSidebarAccordion';
import { BrowseIcon, LinkIcon, SortIcon, TagIcon } from '../../atoms/icons';
import cls from './ChatPartnerDetails.module.scss';

const ChatPartnerDetails = () => {
    return (
        <ChatSidebarAccordion name='Foydalanuvchi' count='2'>
            <div className={cls.section}>
                <div className={cls.section__item}>
                    <div className={cls.section__item__icon}><LinkIcon /></div>
                </div>
                <div className={cls.section__item}>
                    <div className={cls.section__item__icon}><TagIcon /></div>
                </div>
                <div className={cls.section__item}>
                    <div className={cls.section__item__icon}><BrowseIcon /></div>
                    <StudentStatusPicker />
                </div>
                <div className={cls.section__item}>
                    <div className={cls.section__item__icon}><SortIcon /></div>
                    <input type="text" placeholder='Izoh yozing' />
                </div>
            </div>
        </ChatSidebarAccordion>
    );
}

export default ChatPartnerDetails;