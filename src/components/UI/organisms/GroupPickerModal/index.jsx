import Dialog from '../../moleculs/Dialog';
import GroupCard from '../../moleculs/GroupCard';
import cls from './GroupPickerModal.module.scss';

const GroupPickerModal = ({
    isOpen, 
    onClose
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.modal}>
                <GroupCard 
                    title='A1/12'
                    studentsCount={40}
                    mainMentorFullName='Mahliyo Sohibjonova'
                    callMentorFullName='Muhammadali Berdialiyev'
                    isCollecting
                />
                <GroupCard 
                    title='A1/12'
                    studentsCount={40}
                    mainMentorFullName='Mahliyo Sohibjonova'
                    callMentorFullName='Muhammadali Berdialiyev'
                    isCollecting
                />
                <GroupCard 
                    title='A1/12'
                    studentsCount={40}
                    mainMentorFullName='Mahliyo Sohibjonova'
                    callMentorFullName='Muhammadali Berdialiyev'
                    isCollecting
                />
                <GroupCard 
                    title='A1/12'
                    studentsCount={40}
                    mainMentorFullName='Mahliyo Sohibjonova'
                    callMentorFullName='Muhammadali Berdialiyev'
                    isCollecting
                />
            </div>
        </Dialog>
    );
}

export default GroupPickerModal;