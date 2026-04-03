import {ChangeEvent, Dispatch, SetStateAction} from "react";

interface Props {
    names: string[]
    setNames: Dispatch<SetStateAction<string[]>>
    placeholder: string
}
export default function FormNamePool({ names, setNames, placeholder }: Props) {

    function addName() {
        setNames([...names, ""])
    }

    function updateName(e:  ChangeEvent<HTMLInputElement, HTMLInputElement>, index: number) {
        setNames(names.map((n, i) => {
            if (i == index) {
                return e.target.value;
            }
            return n;
        }));
    }

    function deleteName(index: number) {
        setNames(names.filter((_, i) => i !== index));
    }

    return (
        <div>
            {
                names.map((name, key) => {
                    return (
                        <div key={key}>
                            <input
                                type={"text"}
                                defaultValue={name}
                                placeholder={placeholder}
                                onChange={(e) => updateName(e, key)}
                            />
                            <button type={"button"} onClick={() => deleteName(key)}>X</button>
                        </div>
                    )
                })
            }
            <button type={"button"} onClick={addName}>Lisää nimi</button>
        </div>
    )
}