import {ChangeEvent, Dispatch, SetStateAction} from "react";

interface Props {
    text: string | null
    setText: Dispatch<SetStateAction<string | null>>
    placeholder: string
    testingId: string
}
export default function FormTextInput({ text, setText, placeholder, testingId }: Props) {

    function inputChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        const value = e.target.value == "" ? null : e.target.value
        setText(value);
    }

    return (
        <input
            type={"text"}
            placeholder={placeholder}
            defaultValue={text ?? ""}
            onChange={inputChange}
            name={testingId}
        />
    )
}