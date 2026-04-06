"use client";

import AllPersonsTableItem from "@/app/persons/allPersonsTableItem";
import useAllPersons from "@/hooks/useAllPersons";

export default function AllPersonsTable() {

    const { loading, personArray, status} = useAllPersons();

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

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
                    personArray?.map(person => {
                        const f = personArray?.filter(p => p.id == person.fatherId)[0]
                        const m = personArray?.filter(p => p.id == person.motherId)[0]
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