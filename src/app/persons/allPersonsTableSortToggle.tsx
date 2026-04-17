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
    if (sort?.field == value) {
        if (sort.direction == SortDirection.Asc) {
            return (
                <th>
                    {name}
                    <a onClick={() => {setSort(undefined)}}>▲</a>
                    <a onClick={() => {setSort({field: value, direction: SortDirection.Desc})}}>▽</a>
                </th>
            )
        } else {
            return (
                <th>
                    {name}
                    <a onClick={() => {setSort({field: value, direction: SortDirection.Asc})}}>△</a>
                    <a onClick={() => {setSort(undefined)}}>▼</a>
                </th>
            )
        }
    } else {
        return (
            <th>
                {name}
                <a onClick={() => {setSort({field: value, direction: SortDirection.Asc})}}>△</a>
                <a onClick={() => {setSort({field: value, direction: SortDirection.Desc})}}>▽</a>
            </th>
        )
    }
}