import cls from './MentorsTableHeader.module.scss';


const MentorsTableHeader = ({
    headers
}) => {
    return (
        <thead className={cls.head}>
            <tr>
                {
                    headers.map(head => (<th>{head}</th>))
                }
            </tr>
        </thead>
    )
}

export default MentorsTableHeader;