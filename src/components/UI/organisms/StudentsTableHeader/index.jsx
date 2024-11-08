import cls from './StudentsTableHeader.module.scss';

const StudentsTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr>
                <th>№</th>
                <th>Ism,familiya</th>
                <th>Bog’lanish kuni</th>
                <th>Bog’lanish vaqti</th>
                <th>Telefon raqami</th>
                <th>Statusi</th>
                <th></th>
            </tr>
        </thead>
    );
}

export default StudentsTableHeader;