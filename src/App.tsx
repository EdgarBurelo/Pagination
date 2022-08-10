import React from 'react';
import Paginate from "./Pagination/Paginate";

const App: React.FC = () => {
    return (
        <div>
            <Paginate currentPage={1} totalPages={12} />
        </div>
    );
};

export default App;
