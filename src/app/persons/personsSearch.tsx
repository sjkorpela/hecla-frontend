"use client";

import {ChangeEvent, useState} from "react";
import useAllPersonsSearch from "@/hooks/useAllPersonsSearch";
import PersonsSearchItem from "./personsSearchItem";

export default function PersonsSearch() {

    const [searchQuery, setSearchQuery] = useState<string>("");

    const { loading, personArray} = useAllPersonsSearch({searchQuery: searchQuery});

    function inputChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setSearchQuery(e.target.value);
    }

    function renderSearchResults() {
        if (searchQuery.length <= 0) return <></>;
        if (loading) return <div className="persons-search-result-item">Lataa...</div>
        if (personArray == null) return <div className="persons-search-result-item">Ei tuloksia...</div>
        if (personArray.length <= 0) return <div className="persons-search-result-item">Ei tuloksia...</div>

        return personArray.map((person) => {
            return (
                <PersonsSearchItem person={person} key={person.id}/>
            )
        })
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
                    {renderSearchResults()}
                </div>
            </div>
        </div>
    )
}