import TasksTable from '@/components/templates/TasksTable';
import { useGetUncompletedMentorTasks } from '@/hooks/useTask';
import cls from './MentorTasks.module.scss';
import Loader from '@/components/UI/atoms/Loader';

const MentorTasks = () => {
    const { data: tasks, isLoading } = useGetUncompletedMentorTasks()

    return (
        <div className={cls.tasks}>
            {isLoading ? (
                <Loader  />
            ) : (
                <TasksTable />
            )}
        </div>
    );
}

export default MentorTasks;