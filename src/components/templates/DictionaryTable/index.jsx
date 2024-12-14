import DictionaryTableBody from "@/components/UI/organisms/DictionaryTableBody";
import DictionaryTableHeader from "@/components/UI/organisms/DictionaryTableHeader";
import cls from './DictionaryTable.module.scss';
import { useEffect, useState } from "react";
import UpdateWord from "@/components/UI/organisms/UpdateWord";

const DictionaryTable = ({
    words
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [wordId, setWordId] = useState('');

    return (
        <>
            <table className={cls.dictionary__table}>
                <DictionaryTableHeader />
                <DictionaryTableBody words={words} setWordId={setWordId} setOpenModal={setOpenModal}/>
            </table>

            {openModal && <UpdateWord openModal={openModal} closeModal={()=>setOpenModal(false)} wordId={wordId} />} 
        </>
    )
}

export default DictionaryTable;