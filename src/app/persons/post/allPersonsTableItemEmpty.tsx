export default function AllPersonsTableItemEmpty() {
    function notAvailable() { return <span className="not-available">N/A</span>; }
    function noYears() {return <span className="not-available">-</span>; }

    return (
        <tr className="whiteout">
            <td>{noYears()}</td>
            <td>{noYears()}</td>
            <td>{noYears()}</td>
            <td>{noYears()}</td>
        </tr>
    )
}