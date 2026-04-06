import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Gender} from "@/types/gender";

interface Props {
    setSelectedGender: Dispatch<SetStateAction<Gender | null>>
    testingId: string
}
export default function FormGenderSelect({ setSelectedGender, testingId }: Props) {

    function selectChange(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
        const gender = e.target.value;
        setSelectedGender(gender == "null" ? null : gender as Gender)
    }

    return (
        <select onChange={(e) => selectChange(e)} name={testingId}>
                <option value={"null"}>Valitse</option>
                <option value={Gender.Male}>Mies</option>
                <option value={Gender.Female}>Nainen</option>
        </select>
    )
}