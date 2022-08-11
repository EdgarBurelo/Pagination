import React from "react";
import "./Paginate.scss";
import BorderedButton from "../DesignComponents/Buttons/BorderedButton";

type Paginate = {
    currentPage: number
    totalPages: number
}

type onClickPageButton = (event: React.MouseEvent<HTMLElement> & { target: HTMLElement }) => void

const Paginate: React.FC<Paginate> = ({ currentPage, totalPages }) => {
    if (currentPage > totalPages) throw new Error('The current page can not be bigger that the total pages');
    const maxDisplayedPages = 10;
    const shownPages = totalPages / maxDisplayedPages > 1 ? 10 : totalPages

    const onClickPageButton: onClickPageButton = (event) => {
        const pageId: number = parseInt(event.target.id.split("-")[1]);
        console.log(pageId);
        // add Generic callback for the click event over any button
    }

    let start:number
    let end:number
    const differenceBetweenCurrentAndTotal = totalPages - currentPage;

    if (shownPages < maxDisplayedPages) {
        end = shownPages;
        start = 1;
    } else if(currentPage < shownPages) {
        end = shownPages;
        start = 1;
    } else if (differenceBetweenCurrentAndTotal < shownPages / 2) {
        end = totalPages
        start = currentPage - (shownPages - differenceBetweenCurrentAndTotal)
    } else if (differenceBetweenCurrentAndTotal > shownPages / 2) {
        end = currentPage + shownPages / 2 - 1;
        start = currentPage - shownPages / 2;
    } else {
        start = 1;
        end = shownPages;
    }

    const buttons = generateButtons(start, end, currentPage, totalPages, onClickPageButton);

    return (
        <React.Fragment>
            <div className="pagination-container">
                {buttons}
            </div>
        </React.Fragment>
    )
}

const generateButtons = (start: number, end: number, current: number, lastPage: number, fn: onClickPageButton) => {
    const buttons = [];
    for (let i = start; i < end + 1; i++) {
        let label = i === start ? 'First' : `${i}`
        label = i === end ? 'Last' : label

        let id = i === start ? 1 : i;
        id = i === end ? lastPage : id
        let button = (
            <BorderedButton
                key={i}
                active={current === i}
                id={id}
                onClick={fn}
            >
                {label}
            </BorderedButton>
        );
        buttons.push(button);
    }
    return buttons;
}

export default Paginate;
