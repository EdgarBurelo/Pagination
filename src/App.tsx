import React, {useState} from 'react';
import Paginate from "./Pagination/Paginate";

const App: React.FC = () => {
    const [page, setPage] = useState(1);
    const setPageGenCallback = (page: number) => {
        console.log(page);
    };

    return (
        <div>
            Case for less than 10 pages starting on 3
            <Paginate currentPage={3} totalPages={5} setPage={setPageGenCallback} />
            <br />
            Case for more pages starting in 1 page
            <Paginate currentPage={1} totalPages={12} setPage={setPageGenCallback} />
            <br />
            Case for more pages starting in 7 page
            <Paginate currentPage={7} totalPages={12} setPage={setPageGenCallback} />
            <br />
            Case for more pages starting in the middle page
            <Paginate currentPage={10} totalPages={20} setPage={setPageGenCallback} />
            <br />
            Case of a one with the logic lager
            <Paginate currentPage={page} totalPages={20} setPage={setPage} />
        </div>
    );
};

export default App;
