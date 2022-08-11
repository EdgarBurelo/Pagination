import React, {useEffect} from "react";
import "./Paginate.scss";
import BorderedButton from "../DesignComponents/Buttons/BorderedButton";

type Paginate = {
    currentPage: number
    totalPages: number
    setPage: (pageNumber: number) => void
}

type onClickPageButton = (event: React.MouseEvent<HTMLElement> & { target: HTMLElement }) => void

const Paginate: React.FC<Paginate> = ({ currentPage, totalPages, setPage }) => {
    if (currentPage > totalPages) throw new Error('The current page can not be bigger that the total pages');
    const maxDisplayedPages = 10;
    const shownPages = totalPages / maxDisplayedPages > 1 ? 10 : totalPages

    const onClickPageButton: onClickPageButton = (event) => {
        const pageId: number = parseInt(event.target.id.split("-")[1]);
        setPage(pageId);
        // add Generic callback for the click event over any button
    }
    const differenceBetweenCurrentAndTotal = totalPages - currentPage;

    let [start, end] = calculateStart(shownPages, maxDisplayedPages, currentPage, differenceBetweenCurrentAndTotal, totalPages);

    useEffect(() => {
        [start, end] = calculateStart(shownPages, maxDisplayedPages, currentPage, differenceBetweenCurrentAndTotal, totalPages);
        console.log('recalc', start, end)
    }, [currentPage, totalPages, differenceBetweenCurrentAndTotal, maxDisplayedPages, shownPages])

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
        let label = i === start ? `First (1)` : `${i}`
        label = i === end ? `Last (${lastPage})` : label

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

const calculateStart = (
    shownPages: number,
    maxDisplayedPages: number,
    currentPage: number,
    differenceBetweenCurrentAndTotal: number,
    totalPages: number
): [number, number] => {
    let start: number
    let end: number

    if (shownPages < maxDisplayedPages) {
        end = shownPages;
        start = 1;
    } else if(currentPage < shownPages / 2) {
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
    return [start, end];
}

export default Paginate;
