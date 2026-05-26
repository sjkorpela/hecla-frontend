import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import {useRouter} from "next/navigation";

interface Props {
    person: Person
}
export default function PersonsSearchItem({person}: Props) {
    const router = useRouter();

    const personName = PersonService.getPersonsFirstAndLastName(person)

    return (
        <div className="persons-search-result-item" onClick={() => router.push(`/persons/${person.id}`)}>
            {personName}
        </div>
    )
}