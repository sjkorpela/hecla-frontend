
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

    return (
        <div className="page-number-navigation">
            <button className="left" onClick={pageFirst}>{"<<"}</button>
            <button className="center" onClick={pageLeft}>{"<"}</button>
            <div className="center">{pageNumber + 1}</div>
            <button className="center" onClick={pageRight}>{">"}</button>
            <button className="right" onClick={pageLast}>{">>"}</button>
        </div>
    )
}