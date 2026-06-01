"use client";

import AllPersonsTableItem from "@/app/persons/allPersonsTableItem";
import {useState} from "react";
import {PersonsSort} from "@/types/personsSort";
import {PersonsFilter} from "@/types/personsFilter";
import AllPersonsTableFilter from "@/app/persons/allPersonsTableFilter";
import useAllPersonsPaged from "@/hooks/useAllPersonsPaged";
import AllPersonsTableSortToggle from "@/app/persons/allPersonsTableSortToggle";
import PersonsSearch from "@/app/persons/personsSearch";
import {useRouter} from "next/navigation";
import PaginationNavigation from "@/components/paginationNavigation";
import AllPersonsTableItemEmpty from "@/app/persons/post/allPersonsTableItemEmpty";

export default function AllPersonsTable() {
    const router = useRouter();

    const [sort, setSort] = useState<PersonsSort | undefined>();
    const [filter, setFilter] = useState<PersonsFilter | undefined>();
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);

    const { loading, page } = useAllPersonsPaged({pageNumber: pageNumber, pageSize: pageSize, sort: sort, filter: filter});

    function tableBody() {
        if (loading) return (
            <>
                <tr>
                    <td>Lataa...</td><td></td><td></td><td></td>
                </tr>
                {[...Array(pageSize-1)].map((_, i) => <AllPersonsTableItemEmpty key={i}/>)}
            </>
        )

        if (page == null || page.content == null || (page.content.length == 0 && pageNumber == 0)) return (
            <>
                <tr>
                    <td>Ei sukulaisia...</td><td></td><td></td><td></td>
                </tr>
                {[...Array(pageSize-1)].map((_, i) => <AllPersonsTableItemEmpty key={i}/>)}
            </>
        )

        const personRows = page.content.map(person => {
            const f = page.content.filter(p => p.id == person.fatherId)[0]
            const m = page.content.filter(p => p.id == person.motherId)[0]
            return <AllPersonsTableItem person={person} father={f} mother={m} key={person.id}/>;
        })

        const emptyRows = [...Array(pageSize - page.content.length)].map((_, i) => <AllPersonsTableItemEmpty key={i}/>)

        return (
            <>
                {personRows}
                {emptyRows}
            </>
        )
    }

    return (
        <div className="main-divider">
            <aside>
                <PersonsSearch />
                <AllPersonsTableFilter filter={filter} setFilter={setFilter}/>
                <div>
                    <h3>LISÄVAIHTOEHDOT</h3>
                    <button onClick={() => router.push("/persons/post")}>Lisää sukulainen</button>
                </div>
            </aside>

            <div className="all-persons">
                <table>
                    <thead>
                        <tr>
                            <AllPersonsTableSortToggle sort={sort} setSort={setSort} name={"Nimi"} value={"name"} />
                            <AllPersonsTableSortToggle sort={sort} setSort={setSort} name={"Elinaika"} value={"birthYear"} />
                            <th>Isä</th>
                            <th>Äiti</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody()}
                    </tbody>
                </table>
                <PaginationNavigation pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={page?.totalPages ?? 1}/>
            </div>

        </div>
    )
}