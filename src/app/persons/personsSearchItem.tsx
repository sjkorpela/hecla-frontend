import Link from "next/dist/client/link";
import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";

interface Props {
    person: Person
}
export default function PersonsSearchItem({person}: Props) {

    const personName = PersonService.getPersonsFirstAndLastName(person)

    return (
        <tr>
            <td><Link href={`/persons/${person.id}`}><u>{personName}</u></Link></td>
        </tr>
    )
}