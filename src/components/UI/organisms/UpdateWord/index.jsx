import { Modal } from "antd";
import { useGetWord } from "@/hooks/useGetWord";
import Loader from "../../atoms/Loader";
import UpdateWordForm from "../UpdateWordForm";
import Dialog from "../../moleculs/Dialog";
import cls from './UpdateWord.module.scss';


const UpdateWord = ({ wordId, openModal, closeModal }) => {
    const { data: word, isLoading: isLoadingWord} = useGetWord(wordId);

    return (
        <>
            <Dialog isOpen={openModal} onClose={closeModal}>
                <div className={cls.update__field}>
                    {
                        isLoadingWord ? <Loader size={"200px"} /> : <UpdateWordForm word={word} wordId={wordId} closeModal={closeModal}  />
                    }
                </div>
            </Dialog>
        </>
    )

}

export default UpdateWord