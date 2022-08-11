import React from 'react';
import Paginate from "./Pagination/Paginate";

const App: React.FC = () => {
    return (
        <div>
            Case for less than 10 pages starting on 3
            <Paginate currentPage={3} totalPages={5} />
            <br />
            Case for more pages starting in 1 page
            <Paginate currentPage={1} totalPages={12} />
            <br />
            Case for more pages starting in 7 page
            <Paginate currentPage={7} totalPages={12} />
            <br />
            Case for more pages starting in the middle page
            <Paginate currentPage={10} totalPages={20} />
            <br />
        </div>
    );
};

export default App;
