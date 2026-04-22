import {ChangeEvent, Dispatch, SetStateAction} from "react";

interface Props {
    year: number | null
    setYear: Dispatch<SetStateAction<number | null>>
    placeholder?: string | null
    testingId: string
}
export default function FormYearInput({ year, setYear, placeholder, testingId }: Props) {

    function inputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        const nonNumber = Number.isNaN(Number(e.key));
        const enter = e.key == "Enter"
        const tab = e.key == "Tab"
        const backspace = e.key == "Backspace"

        if (nonNumber && !(enter || tab || backspace)) {
            e.preventDefault();
        }
    }

    function inputChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        const value = e.target.value == "" ? null : Number(e.target.value)
        setYear(value);
    }

    return (
        <input
            type={"number"}
            placeholder={placeholder ?? "####"}
            defaultValue={year ?? ""}
            onKeyDown={inputKeyDown}
            onChange={inputChange}
            name={testingId}
        />
    )
}