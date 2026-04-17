"use client";

import useAllPersonsPaged from "@/hooks/useAllPersonsPaged";
import {ChangeEvent, useState} from "react";
import useAllPersonsSearch from "@/hooks/useAllPersonsSearch";
import AllPersonsTableItem from "@/app/persons/allPersonsTableItem";
import PersonsSearchItem from "./personsSearchItem";

export default function PersonsSearch() {

    const [searchQuery, setSearchQuery] = useState<string>("");

    const { loading, personArray, status} = useAllPersonsSearch({searchQuery: searchQuery});

    function inputChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setSearchQuery(e.target.value);
    }

    return (
        <div>
            <input
                onChange={inputChange}
                type={"search"}
                placeholder={"Hae sukulaista nimellä"}
            />
            {
                searchQuery.length < 1 ? <></> :
                loading ? <p>Lataa... </p> :
                    <table><tbody>{
                        personArray != null && personArray.length == 0 ? <tr><td>Ei tuloksia...</td></tr> :
                        personArray?.map((person) => {
                            return (
                                <PersonsSearchItem person={person} key={person.id}/>
                            )
                        })
                    }</tbody></table>
            }
        </div>
    )
}