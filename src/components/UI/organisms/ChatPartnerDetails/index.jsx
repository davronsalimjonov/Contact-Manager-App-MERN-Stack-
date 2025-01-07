import Avatar from 'react-avatar';
import { debounce } from '@/utils/lib';
import { useUserCourseMutations } from '@/hooks/useUserCourse';
import StudentStatusPicker from '../StudentStatusPicker';
import ChatSidebarAccordion from '../../moleculs/ChatSidebarAccordion';
import { BrowseIcon, LinkIcon, SortIcon, TagIcon } from '../../atoms/icons';
import cls from './ChatPartnerDetails.module.scss';

const ChatPartnerDetails = ({
    userCourseId = '',
    status = '',
    comment = '',
    userAvatar = '',
    userFullName = '',
}) => {
    const { updateStatusMutation, updateMutation } = useUserCourseMutations(userCourseId)

    const handleChangeCommentInput = debounce((e) => {
        const value = e.target.value?.trim()
        if (value) {
            updateMutation.mutate({ comment: value })
        }
    }, 300)

    return (
        <ChatSidebarAccordion name='Foydalanuvchi' count='2'>
            <div className={cls.section}>
                <div className={cls.section__item}>
                    <div className={cls.section__item__icon}><LinkIcon /></div>
                    <div className={cls.section__item__info}>
                        <Avatar round={true} size='36' name={userFullName} src={userAvatar} />
                        <h4 className={cls.section__item__info__name}>{userFullName}</h4>
                    </div>
                </div>
                {/* <div className={cls.section__item}>
                    <div className={cls.section__item__icon}><TagIcon /></div>
                </div> */}
                <div className={cls.section__item}>
                    <div className={cls.section__item__icon}><BrowseIcon /></div>
                    <StudentStatusPicker
                        defaultStatus={status}
                        onChange={status => updateStatusMutation.mutate(status)}
                    />
                </div>
                <div className={cls.section__item}>
                    <div className={cls.section__item__icon}><SortIcon /></div>
                    <input
                        defaultValue={comment}
                        type="text"
                        placeholder='Izoh yozing'
                        onChange={handleChangeCommentInput}
                    />
                </div>
            </div>
        </ChatSidebarAccordion>
    );
}

export default ChatPartnerDetails;