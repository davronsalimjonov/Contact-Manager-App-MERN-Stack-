import cls from './ModerationTableHeader.module.scss';

const ModerationTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr >
                <th>№</th>
                <th>Ism familyasi</th>
                <th>Fikri</th>
                <th>Reytingi</th>
            </tr>
        </thead>
    )
}

export default ModerationTableHeader;