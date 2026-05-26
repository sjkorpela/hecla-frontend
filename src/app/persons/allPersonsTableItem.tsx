import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import Link from "next/dist/client/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface Props {
    person: Person,
    father: Person | null,
    mother: Person | null
}

export default function AllPersonsTableItem({ person, father, mother }: Props) {
    const router = useRouter();

    if (person == null) {
        return null;
    }

    const personName = PersonService.getPersonsFirstAndLastName(person)

    const birthYear = person.birthYear ?? null
    const deathYear = person.deathYear ?? null

    const fatherName = PersonService.getPersonsFirstAndLastName(father);
    const motherName = PersonService.getPersonsFirstAndLastName(mother);

    function notAvailable() { return <span className="not-available">N/A</span>; }
    function noYears() {return <span className="not-available">-</span>; }
    function routeToPerson() { router.push(`/persons/${person.id}`); }

    return (
        <tr tabIndex={0} onClick={routeToPerson} className="tr-clickable">
            <td>{personName}</td>
            <td>{birthYear == null && deathYear == null ? noYears() : `${birthYear ?? ""}-${deathYear ?? ""}`}   </td>
            <td>{father != null ? fatherName : notAvailable()}</td>
            <td>{mother != null ? motherName : notAvailable()}</td>
        </tr>
    )
}