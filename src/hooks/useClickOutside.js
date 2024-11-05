import { useEffect, useRef } from "react"

const useClickOutside = ({ onClickOutside }) => {
    const ref = useRef()

    useEffect(() => {
        const handleOutSideClick = (event) => {
            if (!ref.current?.contains(event.target) && (typeof onClickOutside === 'function')) {
                onClickOutside()
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref, onClickOutside]);

    return ref
}

export default useClickOutside