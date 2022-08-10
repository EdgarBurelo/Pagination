import React, {ReactElement} from "react";
import "./Paginate.scss";
import BorderedButton from "../DesignComponents/Buttons/BorderedButton";

type Paginate = {
    currentPage: number
    totalPages: number
}

const Paginate: React.FC<Paginate> = ({ currentPage, totalPages }) => {
    const maxDisplayedPages = 10;
    const shownPages = totalPages / maxDisplayedPages > 1 ? 10 : totalPages

    const onClickPageButton = (event: React.MouseEvent<HTMLElement> & { target: HTMLElement }) => {
        const pageId: number = parseInt(event.target.id.split("-")[1]);
        console.log(pageId);
        // add Generic callback for the click event over any button
    }

    const buttons: ReactElement[] = [];
    for (let i = 0; i < maxDisplayedPages; i++) {
        let label = i === 0 ? 'First' : `${i + 1}`
        label = i + 1 === maxDisplayedPages ? 'Last' : label
        let button = (
            <BorderedButton
                key={i}
                active={currentPage === i + 1}
                id={i + 1}
                onClick={onClickPageButton}
            >
                {label}
            </BorderedButton>
        );
        buttons.push(button);
    }

    return (
        <React.Fragment>
            <div className="pagination-container">
                {buttons}
            </div>
        </React.Fragment>
    )
}

export default Paginate;
