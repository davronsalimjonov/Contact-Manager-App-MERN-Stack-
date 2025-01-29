import { useEffect, useRef } from "react"

const useClickOutside = ({ onClickOutside, disable }) => {
    const ref = useRef()
    
    const handleOutSideClick = (event) => {
        if(disable) return
        if (!ref.current?.contains(event.target) && (typeof onClickOutside === 'function')) {
            onClickOutside()
        }
    };

    useEffect(() => {
        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref, disable]);

    return ref
}

export default useClickOutside