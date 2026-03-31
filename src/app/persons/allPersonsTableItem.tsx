"use client";

import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import Link from "next/dist/client/link";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";

interface Props {
    id: number
}

export default function AllPersonsTableItem({ id }: Props) {

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

    // console.log(person.id, "PERSON:", person);
    // console.log(person.fatherId, "FATHER:", father);
    // console.log(person.motherId, "MOTHER:", mother)

    const firstName = PersonService.getPersonsNickname(person.firstNames) ?? person.firstNames[0].name ?? "N/A"
    const lastName = PersonService.getPersonsCurrentLastName(person.lastNames) ?? person.lastNames[0].name ?? "N/A"

    const birthYear = person.birthYear ?? "N/A"
    const deathYear = person.deathYear ?? ""

    let fatherName = null
    let motherName = null

    if (father) {
        fatherName = PersonService.getPersonsNickname(father.firstNames) ?? father.firstNames[0].name ?? "N/A"
        fatherName += " "
        fatherName += PersonService.getPersonsCurrentLastName(father.lastNames) ?? father.lastNames[0].name ?? "-."
    }

    if (mother) {
        motherName = PersonService.getPersonsNickname(mother.firstNames) ?? mother.firstNames[0].name ?? "N/A"
        motherName += " "
        motherName += PersonService.getPersonsCurrentLastName(mother.lastNames) ?? mother.lastNames[0].name ?? "-."
    }

    return (
        <tr /* onClick={() => redirect(`/persons/${person.id}`)} */>
            <td><Link href={`/persons/${person.id}`}><u>{firstName} {lastName}</u></Link></td>
            <td>{birthYear}-{deathYear}</td>
            <td>{father ? <Link href={`/persons/${father.id}`}><u>{fatherName}</u></Link> : "N/A"}</td>
            <td>{mother ? <Link href={`/persons/${mother.id}`}><u>{motherName}</u></Link> : "N/A"}</td>
        </tr>
    )
}