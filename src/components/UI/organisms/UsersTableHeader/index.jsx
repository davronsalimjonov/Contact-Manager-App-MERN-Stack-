import cls from './UsersTableHeader.module.scss';

const UsersTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr>
                <th>№</th>
                <th>Ism,familiya</th>
                <th>Telefon raqami</th>
                <th>Statusi</th>
                <th>ID</th>
                <th>Ro'yxatdan O'tdi</th>
                <th></th>
            </tr>
        </thead>
    );
}

export default UsersTableHeader;