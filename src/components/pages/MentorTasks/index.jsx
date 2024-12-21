import Loader from '@/components/UI/atoms/Loader';
import TasksTable from '@/components/templates/TasksTable';
import EmptyData from '@/components/UI/organisms/EmptyData';
import { useGetUncompletedMentorTasks } from '@/hooks/useTask';
import cls from './MentorTasks.module.scss';

const MentorTasks = () => {
    const { data: tasks, isLoading } = useGetUncompletedMentorTasks()

    return (
        <div className={cls.tasks}>
            {isLoading ? (
                <Loader  />
            ) : (
                tasks?.length > 0 ? (
                    <TasksTable tasks={tasks} />
                 ) : (
                    <EmptyData text='Sizda hozirda hech qanday task mavjud emas' />
                 )
            )}
        </div>
    );
}

export default MentorTasks;