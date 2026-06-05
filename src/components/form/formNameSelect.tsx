import {ChangeEvent, Dispatch, SetStateAction} from "react";
import WrappedSelect from "@/components/wrappedInputs/wrappedSelect";

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
        <WrappedSelect onChange={(e) => selectChange(e)}>
            <option value={-1}>Valitse</option>
            {
                names.map((fn, key) => {
                    return (
                        <option value={key} key={key}>{fn}</option>
                    )
                })
            }
        </WrappedSelect>
    )
}