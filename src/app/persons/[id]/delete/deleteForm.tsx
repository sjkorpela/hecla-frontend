"use client"

import {PersonService} from "@/services/personService";
import usePerson from "@/hooks/usePerson";
import {useRouter} from "next/navigation";

interface Props {
    id: number
}

export default function DeleteForm({ id }: Props) {
    const router = useRouter();

    const { loading, person, status } = usePerson(id)

    if (status == 404) {
        router.push("/persons")
    }

    if (id == null || person == null) {
        return (
            <p>Loading...</p>
        )
    }

    const personName = PersonService.getPersonsFirstAndLastName(person)
    const birthInfo = `${person.birthYear ?? "N/A"}, ${person.birthPlace ?? "N/A"}`

    async function formSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.target);

        if (form.get("verify") != personName) {
            alert("Kirjoita sukulaisen käyttönimi vahvistaaksesi poiston. Mukaanlukien mahdolliset puuttuvaa tietoa esittävät kohdat, esim. \"Joonas N/A\"")
            return;
        }

        const status = await PersonService.deletePerson(id);

        if (status == 204) {
            router.push("/persons")
        } else {
            alert("Jokin meni vikaan?")
        }
    }

    return (
        <form onSubmit={formSubmit}>
            <h2>Poistettava sukulainen</h2>
            <ul>
                <li>{personName}</li>
                <li>Syntynyt {birthInfo}</li>
            </ul>
            <br/>

            <label>Kirjoita postettavan sukulaisen nimi vahvistaaksesi poiston:</label><br/>
            <input type={"text"} name={"verify"} placeholder={"Etunimi Sukunimi"}/><br/>
            <br/>

            <label>Poista sukulainen</label><br />
            <input type={"submit"} value={"Poista"} name={"delete"}/>
        </form>
    )
}
