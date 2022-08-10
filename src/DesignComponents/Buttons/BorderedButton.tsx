import React from "react";
import "./BorderedButton.scss";

type ButtonProps = {
    active: boolean
    children: string
    id: number
    onClick: (e: React.MouseEvent<HTMLInputElement> & { target: HTMLElement }) => void
}


const BorderedButton: React.FC<ButtonProps> = ({ id, active, onClick, children}) => {
    return (
        <div
            role="button"
            id={`pag_btn-${id}`}
            className={active ? `bordered-active` : `bordered`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
export default BorderedButton;
