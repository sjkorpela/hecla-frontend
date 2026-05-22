import {PersonsSort} from "@/types/personsSort";
import {Dispatch, SetStateAction} from "react";
import {SortDirection} from "@/types/sortDirection";

interface Props {
    sort: PersonsSort | undefined
    setSort: Dispatch<SetStateAction<PersonsSort | undefined>>
    name: string
    value: string
}

export default function AllPersonsTableSortToggle({sort, setSort, name, value}: Props) {


    function fieldName() { return <span className="all-persons-sort" onClick={() => {nextSort()}}>{name}</span>; }

    function nextSort() {
        if (sort == undefined || sort.field != value) setSort({field: value, direction: SortDirection.Asc});
        else if (sort.direction == SortDirection.Asc) setSort({field: value, direction: SortDirection.Desc});
        else setSort(undefined);
    }

    function sortButton(direction: SortDirection, toggledOn: string, toggledOff: string) {

        const arrow = sort != undefined && sort.field == value && sort.direction == direction ? toggledOn : toggledOff;

        return (
            <span onClick={() => toggleSortDirection(direction)} className="all-persons-sort-arrow">
                {arrow}
            </span>
        )
    }

    function toggleSortDirection(direction: SortDirection) {
        if (sort != undefined && sort.field == value && sort.direction == direction) setSort(undefined);
        else setSort({field: value, direction: direction});
    }

    

    return (
        <th>
            {fieldName()}
            {sortButton(SortDirection.Asc, "▲", "△")}
            {sortButton(SortDirection.Desc, "▼", "▽")}
        </th>
    )
}