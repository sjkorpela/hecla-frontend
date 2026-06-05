
import "./paginationNavigation.css"

interface Props {
    pageNumber: number,
    setPageNumber: (newPageNumber: number) => void,
    totalPages: number,
}

export default function PaginationNavigation({pageNumber, setPageNumber, totalPages}: Props) {

    function pageFirst() {
        setPageNumber(0);
    }

    function pageLast() {
        setPageNumber(totalPages - 1);
    }

    function pageLeft() {
        if (pageNumber <= 0) {
            setPageNumber(0);
            return;
        }
        setPageNumber(pageNumber - 1);
    }

    function pageRight() {
        if (pageNumber + 1 >= totalPages) {
            setPageNumber(totalPages - 1);
            return;
        }
        setPageNumber(pageNumber + 1);
    }

    const atFirstPage: boolean = pageNumber <= 0;
    const atLastPage: boolean = pageNumber + 1 >= totalPages;

    return (
        <div className="page-number-navigation">
            <button className={`left icon${atFirstPage ? " disabled" : ""}`} disabled={atFirstPage} onClick={pageFirst}>{ atFirstPage ? "remove" : "first_page"}</button>
            <button className="center icon" disabled={atFirstPage} onClick={pageLeft}>{ atFirstPage ? "remove" : "keyboard_arrow_left"}</button>
            <div className="center text">{pageNumber + 1}</div>
            <button className="center icon" disabled={atLastPage} onClick={pageRight}>{ atLastPage ? "remove" : "keyboard_arrow_right"}</button>
            <button className="right icon" disabled={atLastPage} onClick={pageLast}>{ atLastPage ? "remove" : "last_page"}</button>
        </div>
    )
}