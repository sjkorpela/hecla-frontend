import {ChangeEvent, Dispatch, SetStateAction} from "react";

interface Props {
    names: string[]
    setSelectedName: Dispatch<SetStateAction<number | null>>
    testingId: string
}
export default function FormNameSelect({ names, setSelectedName, testingId }: Props) {

    function selectChange(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
        const index = Number(e.target.value);
        setSelectedName(index == -1 ? null : index)
    }

    return (
        <select onChange={(e) => selectChange(e)} name={testingId}>
            <option value={-1}>Valitse</option>
            {
                names.map((fn, key) => {
                    return (
                        <option value={key} key={key}>{fn}</option>
                    )
                })
            }
        </select>
    )
}