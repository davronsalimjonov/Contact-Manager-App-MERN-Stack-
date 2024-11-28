import cls from './MentorsTableHeader.module.scss';


const MentorsTableHeader = ({
    mentorsType = "Asosiy mentor"
}) => {
    return (
        <thead className={cls.head}>
            <tr>
                <th>№</th>
                <th>{mentorsType}</th>
                <th>O'quvchilarining aktivligi</th>
                <th>Oylik maoshi</th>
                <th>Task bajarish tezligi</th>
                <th></th>
            </tr>
        </thead>
    )
}

export default MentorsTableHeader;