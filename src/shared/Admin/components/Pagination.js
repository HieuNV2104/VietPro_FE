import { Link, useSearchParams, useLocation } from 'react-router-dom';

const Pagination = ({ pages }) => {
    const { total, totalPages, currentPage, next, prev, hasNext, hasPrev } =
        pages;
    const { pathname } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');

    const formatURL = (page) => {
        return `${pathname}?${name ? `name=${name}&` : ''}page=${page}`;
    };

    const renderPages = (delta = 2) => {
        let listPages = [];
        let left = currentPage - delta;
        let right = currentPage + delta;
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                i === currentPage ||
                (i >= left && i <= right)
            ) {
                listPages.push(i);
            }
        }
        return listPages;
    };

    return (
        <div className="panel-footer">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {hasPrev && (
                        <li className="page-item">
                            <Link className="page-link" to={formatURL(prev)}>
                                Trang trước
                            </Link>
                        </li>
                    )}
                    {renderPages()?.map((page, index, array) => {
                        return (
                            <>
                                {page > 1 && page !== array[index - 1] + 1 && (
                                    <li className="page-item">
                                        <span className="page-link">...</span>
                                    </li>
                                )}
                                <li
                                    key={index}
                                    className={`page-item ${
                                        page === currentPage && 'active'
                                    }`}
                                >
                                    <Link
                                        className="page-link"
                                        to={formatURL(page)}
                                    >
                                        {page}
                                    </Link>
                                </li>
                            </>
                        );
                    })}
                    {hasNext && (
                        <li className="page-item">
                            <Link className="page-link" to={formatURL(next)}>
                                Trang sau
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
