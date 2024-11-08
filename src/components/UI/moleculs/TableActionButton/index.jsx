import { useState } from 'react';
import { usePopper } from 'react-popper';
import useClickOutside from '@/hooks/useClickOutside';
import { DotsIcon } from '../../atoms/icons';
import DropdownMenu from '../DropdownMenu';
import cls from './TableActionButton.module.scss'

const TableActionButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useClickOutside({ onClickOutside: () => setIsOpen(false) })
    const [popperElement, setPopperElement] = useState(null);
    const [referenceElement, setReferenceElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-end',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
    });

    return (
        <div ref={wrapperRef}>
            <button
                className={cls.btn}
                ref={setReferenceElement}
                onClick={() => setIsOpen(state => !state)}
            >
                <DotsIcon />
            </button>
            {isOpen && (
                <div
                    ref={setPopperElement}
                    style={{...styles.popper, zIndex: 1}}
                    {...attributes.popper}
                >
                    <DropdownMenu />
                </div>
            )}
        </div>
    );
}

export default TableActionButton;