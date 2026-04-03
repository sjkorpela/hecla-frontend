"use client";

import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import {useEffect, useState} from "react";
import AdditionalInfoItem from "@/app/persons/[id]/additionalInfoItem";
import Link from "next/dist/client/link";

interface Props {
    id: number
}

export default function PersonInfo({ id }: Props) {

    const [person, setPerson] = useState<Person | null>(null);
    const [father, setFather] = useState<Person | null>(null);
    const [mother, setMother] = useState<Person | null>(null);

    useEffect(() => {
        if (id != null) {
            PersonService.getPersonById(id).then(setPerson);
        }
    }, [id]);

    useEffect(() => {
        if (person != null) {
            if (person.fatherId != null) {
                PersonService.getPersonById(person.fatherId).then(setFather);
            }
            if (person.motherId != null) {
                PersonService.getPersonById(person.motherId).then(setMother);
            }
        }
    }, [person]);

    if (id == null || person == null) {
        return null;
    }

    const personName = PersonService.getPersonsFirstAndLastName(person)

    let allFirstNames = ""
    for (let i = 0; i < person.firstNames?.length; i++) {
        if (i == person.firstNames.length - 1) {
            allFirstNames += person.firstNames[i].name
        } else {
            allFirstNames += person.firstNames[i].name + ", "
        }
    }

    let allLastNames = ""
    for (let i = 0; i < person.lastNames?.length; i++) {
        if (i == person.lastNames.length - 1) {
            allLastNames += person.lastNames[i].name
        } else {
            allLastNames += person.lastNames[i].name + ", "
        }
    }

    let gender = "N/A"
    if (person.gender == "MALE") { gender = "Mies"}
    else if (person.gender == "FEMALE") {gender = "Nainen"}

    const birthInfo = `${person.birthYear ?? "N/A"}, ${person.birthPlace ?? "N/A"}`
    const deathInfo = `${person.deathYear ?? "N/A"}, ${person.deathPlace ?? "N/A"}`

    const fatherName = PersonService.getPersonsFirstAndLastName(father);
    const motherName = PersonService.getPersonsFirstAndLastName(mother);

    return (
        <div>
            <h1>{personName?.toUpperCase() ?? "N/A"}</h1>
            <br />
            <h2>PERUSTIEDOT</h2>
            <ul>
                <li>Etunimet: {allFirstNames}</li>
                <li>Sukunimet: {allLastNames}</li>
                <li>Sukupuoli: {gender}</li>
                <li>Syntynyt: {birthInfo}</li>
                <li>Kuollut: {deathInfo}</li>
            </ul>
            <br />
            <h2>LISÄTIEDOT</h2>
            <ul>
                {
                    person.additionalInfos?.map((ai, key) => {
                        return (
                            <div key={key}>
                                <AdditionalInfoItem info={ai} />
                                <br />
                            </div>
                        )
                    })
                }
            </ul>
            <br />
            <h2>VANHEMMAT</h2>
            <ul>
                <li>{ father ? <Link href={`/persons/${father.id}`}><u>{fatherName}</u></Link> : "N/A"}</li>
                <li>{ mother ? <Link href={`/persons/${mother.id}`}><u>{motherName}</u></Link> : "N/A"}</li>
            </ul>
            <br />
            <h2>LISÄVAIHTOEHDOT</h2>
            <ul>
                <li><Link href={`/persons/${id}/put`}><u>Muokkaa sukulaista</u></Link></li>
                <li><Link href={`/persons/${id}/delete`}><u>Poista sukulainen</u></Link></li>
            </ul>
        </div>
    )
}