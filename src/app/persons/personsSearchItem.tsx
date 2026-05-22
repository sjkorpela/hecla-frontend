import Link from "next/dist/client/link";
import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import {redirect} from "next/navigation";

interface Props {
    person: Person
}
export default function PersonsSearchItem({person}: Props) {

    const personName = PersonService.getPersonsFirstAndLastName(person)

    return (
        <div className="persons-search-result-item" onClick={() => redirect(`/persons/${person.id}`)}>
            {personName}
        </div>
    )
}