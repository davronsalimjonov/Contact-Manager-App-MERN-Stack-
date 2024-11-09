import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import WorkspaceColumn from '@/components/UI/organisms/WorkspaceColumn';
import cls from './WorkspaceTable.module.scss';

const WorkspaceTable = () => {
    const [categories, setCategories] = useState({
        ['Umumiy']: {
            title: 'Umumiy',
            color: '#1256DB',
            items: ['1', '2', '3', '4', '5', '6', '7', '8']
        },
        ['Qayta qo’ng’iroqlar']: {
            title: 'Qayta qo’ng’iroqlar',
            color: '#FEC53D',
            items: []
        },
        ['Telefonga javob bermaganlar']: {
            title: 'Telefonga javob bermaganlar',
            color: '#FF0000',
            items: []
        },
        ['Bog’langan qo’ng’iroqlar']: {
            title: 'Bog’langan qo’ng’iroqlar',
            color: '#1AC33B',
            items: []
        },
    });

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        setCategories((prevCategories) => {
            const updatedList = Array.from(prevCategories[source.droppableId]?.items);

            if (source.droppableId === destination.droppableId) {
                const [movedItem] = updatedList.splice(source.index, 1);
                updatedList.splice(destination.index, 0, movedItem);

                return {
                    ...prevCategories,
                    [source.droppableId]: {
                        ...prevCategories[source.droppableId],
                        items: updatedList
                    },
                };
            }

            const sourceList = Array.from(prevCategories[source.droppableId]?.items);
            const destList = Array.from(prevCategories[destination.droppableId]?.items);

            const [movedItem] = sourceList.splice(source.index, 1);

            destList.splice(destination.index, 0, movedItem);

            return {
                ...prevCategories,
                [source.droppableId]: {
                    ...prevCategories[source.droppableId],
                    items: sourceList
                },
                [destination.droppableId]: {
                    ...prevCategories[destination.droppableId],
                    items: destList
                },
            };
        });
    };



    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={cls.table}>
                {Object.keys(categories).map(key => (
                    <WorkspaceColumn
                        key={key}
                        items={categories[key]?.items}
                        id={key}
                        title={key}
                        color={categories[key]?.color}
                    />
                ))}
            </div>
        </DragDropContext>
    );
}

export default WorkspaceTable;