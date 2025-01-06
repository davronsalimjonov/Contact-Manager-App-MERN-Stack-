import { useState } from "react";
import Button from "../../atoms/Buttons/Button";
import { Modal } from "antd";
import AddNewWordForm from "../AddNewWordForm";
import Dialog from "../../moleculs/Dialog";

const AddNewWord = () => {
    const [addWord, setAddWord] = useState(false);

    const handleAddWord = () => {
        setAddWord(true);
    }

    const handleCancel = () => {
        setAddWord(false);
    }


    return (
        <>
            <Button type="button" onClick={handleAddWord}>Lug’at qo’shish</Button>
            <Dialog isOpen={addWord} onClose={handleCancel}>
                <AddNewWordForm closeModal={handleCancel} />
            </Dialog>
        </>
    )
}

export default AddNewWord;