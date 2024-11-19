import { useEffect, useState } from 'react';
import SelectorButton from '../../atoms/SelectorButton';
import FormElementWrapper from '../Form/FormElementWrapper';
import cls from './Selector.module.scss';

const Selector = ({
    items = [],
    onAdd,
    onRemove,
    onChange,
    label = '',
    error = '',
    defaultValue = []
}) => {
    const [activeBtns, setActiveBtns] = useState(defaultValue)

    const handleClickBtn = (value) => {     
        let updatedState

        if (activeBtns.includes(value)) {
            typeof onRemove === 'function' && onRemove(value)
            updatedState = activeBtns.filter(item => item !== value)
        } else {
            typeof onAdd === 'function' && onAdd(value)
            updatedState = [...activeBtns, value]
        }

        setActiveBtns(updatedState)
        onChange(updatedState)
    }

    return (
        <FormElementWrapper label={label} error={error}>
            <div className={cls.selector}>
                {items?.length > 0 && items?.map(item => (
                    <SelectorButton
                        key={item?.value}
                        isActive={activeBtns?.includes(item?.value)}
                        onClick={() => handleClickBtn(item?.value)}
                    >
                        {item?.label}
                    </SelectorButton>
                ))}
            </div>
        </FormElementWrapper>
    );
}

export default Selector;