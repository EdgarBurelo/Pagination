import React from 'react';
import {cleanup, render, RenderResult, fireEvent} from '@testing-library/react';
import Paginate from "./Paginate";

afterEach(cleanup);

let documentBody: RenderResult;

describe('Pagination Element', () => {

    it('renders the total 10 pages when the total amount of pages is bigger than 10', () => {
        const totalPages = 12 ;
        const maxAmountOfButtonPages = 10;
        documentBody = render(<Paginate totalPages={totalPages} currentPage={1} setPage={jest.fn()}/>);
        const buttons = documentBody.getAllByRole("button");
        expect(buttons.length).toBe(maxAmountOfButtonPages);
    });

    it('renders the first and the last element with "first" and "last" as labels', () => {
        const totalPages = 12 ;
        const expectedFirstButtonLabel = 'First (1)';
        const expectedLastButtonLabel = `Last (${totalPages})`;
        documentBody = render(<Paginate totalPages={totalPages} currentPage={1} setPage={jest.fn()}/>);

        const buttons = documentBody.getAllByRole("button");

        expect(buttons[0].innerHTML).toBe(expectedFirstButtonLabel);
        expect(buttons[buttons.length - 1].innerHTML).toBe(expectedLastButtonLabel);
    });

    it('highlights the current page', () => {
        const totalPages = 12 ;
        const currentPage = 4;
        const buttonClass = 'bordered-active';
        documentBody = render(<Paginate totalPages={totalPages} currentPage={currentPage} setPage={jest.fn()}/>);

        const button = documentBody.getByText(currentPage.toString());
        expect(button.className).toBe(buttonClass);
    });

    it('Triggers the callback function when clicked and returns the page value', () => {
        const totalPages = 12 ;
        const currentPage = 4;
        const setPageFunction = jest.fn((page) => page);
        documentBody = render(<Paginate totalPages={totalPages} currentPage={currentPage} setPage={setPageFunction}/>);

        const button = documentBody.getByText(currentPage.toString());
        expect(setPageFunction).toHaveBeenCalledTimes(0);
        fireEvent.click(button);
        expect(setPageFunction).toHaveBeenCalledTimes(1);
        expect(setPageFunction.mock.results[0].value).toBe(currentPage);
    });

    it('recalculate values when a page button is clicked', () => {
        const totalPages = 20 ;
        let currentPage = 4;

        const setPageFunction = jest.fn((page) => currentPage = page);
        documentBody = render(<Paginate totalPages={totalPages} currentPage={currentPage} setPage={setPageFunction}/>);

        const buttons = documentBody.getAllByRole("button");
        buttons.forEach((button, i) => {
            if (i===0) expect(button.innerHTML).toBe('First (1)');
            else if(i===9) expect(button.innerHTML).toBe(`Last (${totalPages})`);
            else expect(button.innerHTML).toBe((1+i).toString());
        });

        const button9 = documentBody.getByText('9');
        fireEvent.click(button9);

        documentBody.rerender(<Paginate totalPages={totalPages} currentPage={currentPage} setPage={setPageFunction}/>);
        const reRenderedButtons = documentBody.getAllByRole("button");

        reRenderedButtons.forEach((button, i) => {
            if (i===0) expect(button.innerHTML).toBe('First (1)');
            else if(i===9) expect(button.innerHTML).toBe(`Last (${totalPages})`);
            else expect(button.innerHTML).toBe((4+i).toString());
        });
    });

    it('recalculate values when a page last-page button is clicked', () => {
        const totalPages = 20 ;
        let currentPage = 4;

        const setPageFunction = jest.fn((page) => currentPage = page);
        documentBody = render(<Paginate totalPages={totalPages} currentPage={currentPage} setPage={setPageFunction}/>);

        const buttons = documentBody.getAllByRole("button");
        buttons.forEach((button, i) => {
            if (i===0) expect(button.innerHTML).toBe('First (1)');
            else if(i===9) expect(button.innerHTML).toBe(`Last (${totalPages})`);
            else expect(button.innerHTML).toBe((1+i).toString());
        });

        const lastPageButton = documentBody.getByText(`Last (${totalPages})`);
        fireEvent.click(lastPageButton);

        documentBody.rerender(<Paginate totalPages={totalPages} currentPage={currentPage} setPage={setPageFunction}/>);
        const reRenderedButtons = documentBody.getAllByRole("button");

        reRenderedButtons.forEach((button, i) => {
            if (i===0) expect(button.innerHTML).toBe('First (1)');
            else if(i===9) expect(button.innerHTML).toBe(`Last (${totalPages})`);
            else expect(button.innerHTML).toBe((11+i).toString());
        });
    });

    it('recalculate values when a page first-page button is clicked', () => {
        const totalPages = 20 ;
        let currentPage = 20;

        const setPageFunction = jest.fn((page) => currentPage = page);
        documentBody = render(<Paginate totalPages={totalPages} currentPage={currentPage} setPage={setPageFunction}/>);

        const buttons = documentBody.getAllByRole("button");
        buttons.forEach((button, i) => {
            if (i===0) expect(button.innerHTML).toBe('First (1)');
            else if(i===9) expect(button.innerHTML).toBe(`Last (${totalPages})`);
            else expect(button.innerHTML).toBe((11+i).toString());
        });

        const firstPageButton = documentBody.getByText('First (1)');
        fireEvent.click(firstPageButton);

        documentBody.rerender(<Paginate totalPages={totalPages} currentPage={currentPage} setPage={setPageFunction}/>);
        const reRenderedButtons = documentBody.getAllByRole("button");

        reRenderedButtons.forEach((button, i) => {
            if (i===0) expect(button.innerHTML).toBe('First (1)');
            else if(i===9) expect(button.innerHTML).toBe(`Last (${totalPages})`);
            else expect(button.innerHTML).toBe((1+i).toString());
        });
    });
});
