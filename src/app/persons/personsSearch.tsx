"use client";

import useAllPersonsPaged from "@/hooks/useAllPersonsPaged";
import {ChangeEvent, useState} from "react";
import useAllPersonsSearch from "@/hooks/useAllPersonsSearch";
import AllPersonsTableItem from "@/app/persons/allPersonsTableItem";
import PersonsSearchItem from "./personsSearchItem";

export default function PersonsSearch() {

    const [searchQuery, setSearchQuery] = useState<string>("");

    const { loading, personArray} = useAllPersonsSearch({searchQuery: searchQuery});

    function inputChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setSearchQuery(e.target.value);
    }

    return (
        <div className="persons-search">
            <div className="persons-search-wrapper">
                <input
                    onChange={inputChange}
                    type={"search"}
                    placeholder={"Hae sukulaista nimellä"}
                />
                <div className="persons-search-results">
                    {
                        searchQuery.length < 1 ? <></> :
                            loading ? <div className="persons-search-result-item">Lataa... </div> :
                                <>{
                                    personArray != null && personArray.length == 0 ? <div className="persons-search-result-item">Ei tuloksia...</div> :
                                        personArray?.map((person) => {
                                            return (
                                                <PersonsSearchItem person={person} key={person.id}/>
                                            )
                                        })
                                }</>
                    }
                </div>
            </div>

        </div>
    )
}