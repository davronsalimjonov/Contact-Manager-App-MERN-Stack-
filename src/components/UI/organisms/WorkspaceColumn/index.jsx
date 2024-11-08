import WorkspaceCard from '../../moleculs/WorkspaceCard';
import cls from './WorkspaceColumn.module.scss';

const WorkspaceColumn = () => {
    return (
        <div className={cls.column}>
            <span className={cls.column__line}></span>
            <h2 className={cls.column__title}>Umumiy</h2>
            <div className={cls.column__cards}>
                <WorkspaceCard />
                <WorkspaceCard />
                <WorkspaceCard />
                <WorkspaceCard />
                <WorkspaceCard />
                <WorkspaceCard />
                <WorkspaceCard />
                <WorkspaceCard />
            </div>
        </div>
    );
}

export default WorkspaceColumn;