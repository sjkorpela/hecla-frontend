"use client";

import {persons} from "@/services/persons";

export default function PersonsList() {

    async function refreshList() {
        console.log(await persons.getAllPersons());
    }
    return (
        <div>
            <p>persons list</p>
            <button onClick={refreshList}>
                log persons in console
            </button>
        </div>
    )
}