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
                    <button onClick={() => {setSort(undefined)}}><span className="up">▲</span></button>
                    <button onClick={() => {setSort({field: value, direction: SortDirection.Desc})}}><span>▽</span></button>
                </th>
            )
        } else {
            return (
                <th>
                    {name}
                    <button onClick={() => {setSort({field: value, direction: SortDirection.Asc})}}><span className="up">△</span></button>
                    <button onClick={() => {setSort(undefined)}}><span>▼</span></button>
                </th>
            )
        }
    } else {
        return (
            <th>
                {name}
                <button onClick={() => {setSort({field: value, direction: SortDirection.Asc})}}><span className="up">△</span></button>
                <button onClick={() => {setSort({field: value, direction: SortDirection.Desc})}}><span>▽</span></button>
            </th>
        )
    }
}