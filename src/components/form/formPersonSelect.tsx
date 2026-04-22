import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";

interface Props {
    persons: Person[] | null
    selectedPersonId: number | null
    setSelectedPersonId: Dispatch<SetStateAction<number | null>>
    testingId: string
}
export default function FormPersonSelect({ persons, selectedPersonId, setSelectedPersonId, testingId }: Props) {

    function selectChange(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
        const index = Number(e.target.value);
        setSelectedPersonId(index == -1 ? null : index)
    }

    const defaultValue = selectedPersonId == null ? -1 : selectedPersonId;
    const options = persons ?? [];

    return (
        <select
            value={defaultValue}
            onChange={(e) => selectChange(e)}
            name={testingId}
        >
            <option value={-1}>Valitse</option>
            {
                options.map((person, key) => {
                    return (
                        <option
                            value={person.id}
                            key={key}
                        >
                            {person.id} {PersonService.getPersonsFirstAndLastName(person)}
                        </option>
                    )
                })
            }
        </select>
    )
}