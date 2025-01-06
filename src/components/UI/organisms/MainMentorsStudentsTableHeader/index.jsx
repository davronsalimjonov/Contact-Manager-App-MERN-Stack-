import cls from './MainMentorStudentsTableHeader.module.scss';

const MainMentorStudentsTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr>
                <th>№</th>
                <th>Ism,familiya</th>
                <th>Telefon raqami</th>
                <th>Guruhi</th>
                <th>Statusi</th>
                <th></th>
            </tr>
        </thead>
    );
}

export default MainMentorStudentsTableHeader;