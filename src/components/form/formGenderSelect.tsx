import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Gender} from "@/types/gender";

interface Props {
    gender: Gender | null
    setSelectedGender: Dispatch<SetStateAction<Gender | null>>
    testingId: string
}
export default function FormGenderSelect({ gender, setSelectedGender, testingId }: Props) {

    function selectChange(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
        const gender = e.target.value;
        setSelectedGender(gender == "null" ? null : gender as Gender)
    }

    return (
        <select onChange={(e) => selectChange(e)} name={testingId} value={gender?.valueOf()}>
                <option value={"null"}>Valitse</option>
                <option value={Gender.Male.valueOf()}>Mies</option>
                <option value={Gender.Female.valueOf()}>Nainen</option>
        </select>
    )
}