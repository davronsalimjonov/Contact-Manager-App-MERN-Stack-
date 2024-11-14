import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { getStatusColor, groupByStatus } from '@/utils/workspace';
import { updateWorkspaceStatus } from '@/services/workspace';
import WorkspaceColumn from '@/components/UI/organisms/WorkspaceColumn';
import cls from './WorkspaceTable.module.scss';

const WorkspaceTable = ({
    workspace = []
}) => {
    const [statuses, setStatuses] = useState(groupByStatus(workspace));

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        setStatuses(prevStatuses => {
            const updatedList = Array.from(prevStatuses[source.droppableId] || []);
            
            updateWorkspaceStatus(draggableId, { status: destination.droppableId, index: destination.index })

            if (source.droppableId === destination.droppableId) {
                const [movedItem] = updatedList.splice(source.index, 1);
                updatedList.splice(destination.index, 0, movedItem);

                return {
                    ...prevStatuses,
                    [source.droppableId]: updatedList,
                };
            }

            const sourceList = Array.from(prevStatuses[source.droppableId] || []);
            const destList = Array.from(prevStatuses[destination.droppableId] || []);

            const [movedItem] = sourceList.splice(source.index, 1);

            destList.splice(destination.index, 0, movedItem);

            return {
                ...prevStatuses,
                [source.droppableId]: sourceList,
                [destination.droppableId]: destList,
            };
        })
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={cls.table}>
                <WorkspaceColumn
                    title='Umumiy'
                    color={getStatusColor('not-connected')}
                    items={statuses?.['not-connected']}
                    status='not-connected'
                />
                <WorkspaceColumn
                    title='Qayta qo’ng’iroqlar'
                    color={getStatusColor('call-back')}
                    items={statuses?.['call-back']}
                    status='call-back'
                />
                <WorkspaceColumn
                    title='Telefonga javob bermaganlar'
                    color={getStatusColor('not-answered')}
                    items={statuses?.['not-answered']}
                    status='not-answered'
                />
                <WorkspaceColumn
                    title='Bog’langan qo’ng’iroqlar'
                    color={getStatusColor('connected')}
                    items={statuses?.['connected']}
                    status='connected'
                />
            </div>
        </DragDropContext>
    );
}

export default WorkspaceTable;