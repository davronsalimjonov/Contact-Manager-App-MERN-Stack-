import cls from './MentorStatusBadge.module.scss';

const MentorStatusBadge = ({status = ''}) => {
    return (
        <div className={cls.badge}>
            {status}
        </div>
    );
}

export default MentorStatusBadge;