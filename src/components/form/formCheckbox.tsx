import {ChangeEvent, Dispatch, SetStateAction} from "react";

interface Props {
    state: boolean | null
    setState: Dispatch<SetStateAction<boolean | null>>
    testingId: string
}
export default function FormCheckbox({ state, setState, testingId }: Props) {

    function inputChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setState(e.target.checked);
    }

    return (
        <input
            type={"checkbox"}
            defaultChecked={state ?? false}
            onChange={inputChange}
            name={testingId}
        />
    )
}