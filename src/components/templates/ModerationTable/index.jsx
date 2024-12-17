import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import { getUserFullName } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './ModerationTable.module.scss';
import ModerationTableHeader from '@/components/UI/organisms/ModerationTableHeader';
import ModerationTableRow from '@/components/UI/moleculs/ModerationTableRow';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { useState } from 'react';
import ModerationDialog from '@/components/UI/organisms/ModerationDialog';

const ModerationTable = ({
    comments = [],
    triggerRef,
    isLoading
}) => {
    const currenPage = comments?.meta?.currentPage;
    const limit = comments?.meta?.itemsPerPage;

    const [isOpen, setIsOpen] = useState(false);

    const [comment, setComment] = useState({})

    const onClose = () => {
        setIsOpen(false);
    }

    const onOpen = (data) => {
        setComment(data);
        setIsOpen(true);
    }


    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {comments.items?.length > 0 ? (
                <table className={cls.table}>
                    <ModerationTableHeader />
                    <tbody>
                        <Mapper
                            data={comments.items}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(student, index) => (
                                <ModerationTableRow
                                    key={student?.id}
                                    commentId={student?.id}
                                    index={(currenPage - 1) * limit + index + 1}
                                    fullName={getUserFullName(student?.user)}
                                    phoneNumber={formatPhoneNumberIntl(student?.user?.phone)}
                                    comment={student?.comment}
                                    avarageRate={student?.rate}
                                    url={student?.user?.url}
                                    onOpen={onOpen}
                                />
                            )}
                        />
                        <tr ref={triggerRef}></tr>
                    </tbody>
                </table>
            ) : (

                !isLoading && <EmptyData text="Sizda hozirda hech qanday foydalanuvchilar fikri mavjud emas." />
            )}
            {isLoading && <Loader size={80} />}

            <ModerationDialog comment={comment} isOpen={isOpen} onClose={onClose} />

        </div>
    );
}

export default ModerationTable;