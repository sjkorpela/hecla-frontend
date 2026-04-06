"use client"

import {useEffect, useState} from "react";
import FormNamePool from "@/components/form/formNamePool";
import {AdditionalInfo} from "@/types/additionalInfo";
import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import {PostPerson} from "@/types/postPerson";
import {FirstName} from "@/types/firstName";
import {LastName} from "@/types/lastName";
import FormAdditionalInfoPool from "@/components/form/formAdditionalInfoPool";
import {redirect, useRouter} from "next/navigation";
import {router} from "next/dist/client";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
    id: number
}

export default function DeleteForm({ id }: Props) {

    const [person, setPerson] = useState<Person | null>(null);
    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        PersonService.getPersonById(id).then(setPerson);
    }, [id]);

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
