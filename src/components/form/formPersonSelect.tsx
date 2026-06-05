import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import WrappedSelect from "@/components/wrappedInputs/wrappedSelect";
import PersonsSearch from "@/app/persons/personsSearch";
import useAllPersons from "@/hooks/useAllPersons";

interface Props {
    selectedPersonId: number | null
    setSelectedPersonId: Dispatch<SetStateAction<number | null>>
    testingId: string
}
export default function FormPersonSelect({ selectedPersonId, setSelectedPersonId, testingId }: Props) {

    function selectChange(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
        const index = Number(e.target.value);
        setSelectedPersonId(index == -1 ? null : index)
    }

    const defaultValue = selectedPersonId == null ? -1 : selectedPersonId;
    const options = useAllPersons().personArray ?? [];

    return (
        <WrappedSelect value={defaultValue} onChange={(e) => selectChange(e)}>
            <option value={-1}>Valitse</option>
            {
                options.map((person, key) => {
                    return (
                        <option value={person.id} key={person.id}>
                            {PersonService.getPersonsFirstAndLastName(person)}
                        </option>
                    )
                })
            }
        </WrappedSelect>
    )
}