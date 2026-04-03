"use client";

import {PersonService} from "@/services/personService";
import {useEffect, useState} from "react";
import {Person} from "@/types/person";
import AllPersonsTableItem from "@/app/persons/allPersonsTableItem";

export default function AllPersonsTable() {

    const [personList, setPersonList] = useState<Person[] | null>(null);

    useEffect(() => {
        if (personList == null) {
            PersonService.getAllPersons().then(setPersonList);
        }
    }, [personList]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Nimi</th>
                    <th>Elinaika</th>
                    <th>Isä</th>
                    <th>Äiti</th>
                </tr>
            </thead>
            <tbody>
                {
                    personList?.map(person => {
                        const f = personList?.filter(p => p.id == person.fatherId)[0]
                        const m = personList?.filter(p => p.id == person.motherId)[0]
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
    )
}