"use client";

import AllPersonsTableItem from "@/app/persons/allPersonsTableItem";
import useAllPersons from "@/hooks/useAllPersons";
import {useState} from "react";
import {PersonsSort} from "@/types/personsSort";
import {PersonsFilter} from "@/types/personsFilter";
import AllPersonsTableFilter from "@/app/persons/allPersonsTableFilter";
import useAllPersonsPaged from "@/hooks/useAllPersonsPaged";
import {SortDirection} from "@/types/sortDirection";
import AllPersonsTableSortToggle from "@/app/persons/allPersonsTableSortToggle";
import PersonsSearch from "@/app/persons/personsSearch";
import Link from "next/dist/client/link";

export default function AllPersonsTable() {

    const [sort, setSort] = useState<PersonsSort | undefined>();
    const [filter, setFilter] = useState<PersonsFilter | undefined>();

    const { loading, page, status} = useAllPersonsPaged({sort: sort, filter: filter});

    return (
        <div className="main-divider">
            <aside>

                <div>
                    <h3>HAKU</h3>
                    <PersonsSearch />
                </div>

                <div>
                    <h3>SUODATUS</h3>
                    <AllPersonsTableFilter filter={filter} setFilter={setFilter}/>
                </div>

                <div>
                    <h3>LISÄVAIHTOEHDOT</h3>
                    <Link href={"/persons/post"}><u>Lisää sukulainen</u></Link>
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
                    {
                        loading ? <tr><td>Lataa...</td><td></td><td></td><td></td></tr> :
                            page != null && page.content.length == 0 ? <tr><td>Ei tuloksia...</td><td></td><td></td><td></td></tr> :
                                page?.content?.map(person => {
                                    const f = page?.content?.filter(p => p.id == person.fatherId)[0]
                                    const m = page?.content?.filter(p => p.id == person.motherId)[0]
                                    return (
                                        <AllPersonsTableItem
                                            person={person}
                                            father={f}
                                            mother={m}
                                            key={person.id}
                                        />
                                    )
                                })
                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}