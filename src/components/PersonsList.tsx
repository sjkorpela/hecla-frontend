"use client";

import {persons} from "@/services/persons";
import {useState} from "react";
import {Person} from "@/types/person";

export default function PersonsList() {

    const [personList, setPersonList] = useState<Person[]>([]);

    async function refreshList() {
        const temp = await persons.getAllPersons()
        console.log(temp);
        setPersonList(temp);
    }
    return (
        <div>
            <p>persons list</p>
            <button onClick={refreshList}>
                refresh
            </button>
            <ul>
                {
                    personList?.map(person => {
                        return (
                            <li key={person.id}>
                                {person.id}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}