import cls from './MentorsTableHeader.module.scss';

const MentorsTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr>
                <th>№</th>
                <th>Ism familiyasi</th>
                <th>Telefon Nomer</th>
                <th>Daraja</th>
                <th>Statusi</th>
                <th>O'quvchilar Soni</th>
                <th></th>
            </tr>
        </thead>
    );
}

export default MentorsTableHeader;