import React from 'react';
import {cleanup, render, RenderResult} from '@testing-library/react';
import App from "./App";

afterEach(cleanup);

let documentBody: RenderResult;

describe.skip('App functionality', () => {
    it('renders', () => {
        documentBody = render(<App />);
        expect(documentBody.getByText('Hello world :/')).toBeInTheDocument();
    });
});
