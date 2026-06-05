"use client"

import {PersonService} from "@/services/personService";
import usePerson from "@/hooks/usePerson";
import {useRouter} from "next/navigation";
import "./deleteForm.css"
import {useEffect, useState} from "react";

interface Props {
    id: number
}

export default function DeleteForm({ id }: Props) {
    const router = useRouter();

    const { loading, person, status } = usePerson(id)

    useEffect(() => {
        if (status == 404) {
            router.push("/persons/refresh")
        }
    }, [status]);

    if (id == null || person == null) {
        return (
            <p>Loading...</p>
        )
    }

    const personName = PersonService.getPersonsFirstAndLastName(person)
    // const birthInfo = `${person.birthYear ?? "N/A"}, ${person.birthPlace ?? "N/A"}`

    async function deletePerson() {
        const status = await PersonService.deletePerson(id);

        if (status == 204) {
            router.push("/persons/refresh")
        } else {
            alert("Jokin meni vikaan?")
        }
    }

    function navBack() { router.back(); }

    return (
        <div className="delete-form">
            <header>
                <button className="icon-button" onClick={navBack} >arrow_back</button>
            </header>

            <div>
                <h1>POISTA SUKULAINEN?</h1>
                <div className="info">Sukulainen: {personName}</div>

                <button onClick={deletePerson}>Poista sukulainen</button>
            </div>
        </div>

    )
}
