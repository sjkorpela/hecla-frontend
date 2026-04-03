import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import Link from "next/dist/client/link";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";

interface Props {
    person: Person,
    father: Person | null,
    mother: Person | null
}

export default function AllPersonsTableItem({ person, father, mother }: Props) {

    if (person == null) {
        return null;
    }

    const personName = PersonService.getPersonsFirstAndLastName(person)

    const birthYear = person.birthYear ?? "N/A"
    const deathYear = person.deathYear ?? ""

    const fatherName = PersonService.getPersonsFirstAndLastName(father);
    const motherName = PersonService.getPersonsFirstAndLastName(mother);

    return (
        <tr /* onClick={() => redirect(`/persons/${person.id}`)} */>
            <td><Link href={`/persons/${person.id}`}><u>{personName}</u></Link></td>
            <td>{birthYear}-{deathYear}</td>
            <td>{father?.id ? <Link href={`/persons/${father.id}`}><u>{fatherName}</u></Link> : "N/A"}</td>
            <td>{mother?.id ? <Link href={`/persons/${mother.id}`}><u>{motherName}</u></Link> : "N/A"}</td>
        </tr>
    )
}