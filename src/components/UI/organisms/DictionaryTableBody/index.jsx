import { EditIcon } from '../../atoms/icons';
import cls from './DictionaryTableBody.module.scss';
import Button from '../../atoms/Buttons/Button';

const DictionaryTableBody = ({
    words,
    setWordId,
    setOpenModal
}) => {
    const currenPage = words.meta.currentPage;
    const limit = words.meta.itemsPerPage;

    const handleUpdate = (id) => {
        setWordId(id);
        setOpenModal(true);
    }

    return (
        <>
            <tbody>
                {
                    words.items.map((word, index) => (
                        <tr key={word.id} className={cls.dictionary__row}>
                            <td className={cls.dictionary__row__td}>{(currenPage - 1) * limit + index + 1}</td>
                            <td className={cls.dictionary__row__td}>{word.word}</td>
                            <td className={cls.dictionary__row__td}>{word.description}</td>
                            <td className={cls.dictionary__row__td}>{word.unit && `Unit ${word.unit}`}</td>
                            <td className={cls.dictionary__row__td}>{word.lvl}</td>
                            <td className={cls.dictionary__row__td}>
                                <Button className={cls.edit__button} onClick={()=>handleUpdate(word.id)} type='button'><EditIcon /></Button>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </>
    )
}

export default DictionaryTableBody;