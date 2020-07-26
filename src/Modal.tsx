import React, { useEffect, useRef, ReactChild, FunctionComponent } from "react";
import { createPortal } from "react-dom";


const modalRoot = document.getElementById("modal");

const Modal:FunctionComponent = ({ children }) => {
    const elref = useRef(document.createElement("div"));

    useEffect(() => {

        if(!modalRoot) {
            return;
        }
        modalRoot.appendChild(elref.current);
        return () => {
            modalRoot.removeChild(elref.current);
        }
    }, []);

    return createPortal(<div>{children}</div>, elref.current);
};

export default Modal;