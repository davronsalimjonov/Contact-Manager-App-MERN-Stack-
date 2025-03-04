import { FilterIcon } from '../../atoms/icons';
import cls from './DictionaryTableHeader.module.scss';

const DictionaryTableHeader = () => {
    return (
        <thead>
            <tr className={cls.dictionary__head}>
                <th className={cls.dictionary__head__th}>№</th>
                <th className={cls.dictionary__head__th}>Inglizchasi</th>
                <th className={cls.dictionary__head__th}>O’zbekchasi</th>
                <th className={cls.dictionary__head__th}>Unitlari</th>
                <th className={cls.dictionary__head__th}>Darajasi</th>
                <th className={cls.dictionary__head__th}>
                    <FilterIcon />
                </th>
            </tr>
        </thead>
    )
}

export default DictionaryTableHeader;