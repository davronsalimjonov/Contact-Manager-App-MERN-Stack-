import cls from './ServisStatisticTableHeader.module.scss';

const ServisStatisticTableHeader = ({
    headers
}) => {
    return (
        <thead className={cls.head}>
            <tr className={cls.head__row}>
                {
                    headers?.map((header, index) => <th key={index}>{header}</th>)
                }
            </tr>
        </thead>
    )
}

export default ServisStatisticTableHeader;