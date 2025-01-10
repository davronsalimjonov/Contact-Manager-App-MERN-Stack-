import { getDayName } from '@/utils/time';
import { getUserFullName } from '@/utils/lib';
import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './UsersTable.module.scss';
import UsersTableHeader from '@/components/UI/organisms/UsersTableHeader';
import UsersTableRow from '@/components/UI/moleculs/UsersTableRow';
import Dialog from '@/components/UI/moleculs/Dialog';
import FormInput from '@/components/UI/moleculs/Form/FormInput';
import Button from '@/components/UI/atoms/Buttons/Button';

const UsersTable = ({
    students = [],
    triggerRef,
    isLoading,
    isModal=false,
    setIsModal,
    setUserId,
    handleChangePsw,
    setPassword,
}) => {

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {students?.length > 0 ? (
                <>
                    <table className={cls.table}>
                        <UsersTableHeader />
                        <tbody>
                            <Mapper
                                data={students}
                                isInfinityQuery
                                isLoading={isLoading}
                                renderItem={(student, index) => (
                                    <UsersTableRow
                                        key={student?.id}
                                        index={index + 1}
                                        unreadedMessagesCount={student?.messageCount}
                                        avatar={student?.url}
                                        fullName={getUserFullName(student)}
                                        phoneNumber={student?.phone}
                                        days={student?.days?.map(day => getDayName(day, 'short')).join(', ') || ''}
                                        time={student?.connectionTime}
                                        status={student?.status === "Free" ? "Free" : "Pro"}
                                        userCourseId={student.id}
                                        student={student?.id}
                                        uniqueId={student?.uniqueId}
                                        createdAt={student?.createdAt}
                                        setIsModal={setIsModal}
                                        setUserId={setUserId}
                                    />
                                )}
                            />
                            <tr ref={triggerRef}></tr>
                        </tbody>
                    </table>
                    <Dialog isOpen={isModal} onClose={setIsModal}>
                        <div className={cls.change__psw}>
                            <label htmlFor="select">Parol O'zgartirish</label>
                            <FormInput
                                placeholder='Yangi Parolni Kiriting'
                                isClearable
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button 
                                className={cls.change__psw__btn} 
                                onClick={() => {
                                    handleChangePsw()
                                }}
                                >
                                Yangilash
                            </Button>

                        </div>
                    </Dialog>
                </>
            ) : (
                !isLoading && <EmptyData />  
            )}
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default UsersTable;