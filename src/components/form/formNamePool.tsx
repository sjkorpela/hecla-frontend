import {ChangeEvent, Dispatch, SetStateAction} from "react";
import "./formNamePool.css";

interface Props {
    names: string[]
    setNames: Dispatch<SetStateAction<string[]>>
    placeholder: string
    testingId: string
}
export default function FormNamePool({ names, setNames, placeholder, testingId }: Props) {

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
        <div className="name-pool">
            {
                names.map((name, key) => {
                    return (
                        <div key={key} className="name-pool-object">
                            <input
                                type={"text"}
                                defaultValue={name}
                                placeholder={placeholder}
                                onChange={(e) => updateName(e, key)}
                                name={testingId}
                            />
                            <button
                                className="name-pool-object-remove"
                                type={"button"}
                                onClick={() => deleteName(key)}
                                name={`${testingId}_delete`}
                            ></button>
                        </div>
                    )
                })
            }
            <button
                type={"button"}
                onClick={addName}
                name={`${testingId}_new`}
            >Lisää uusi nimi</button>
        </div>
    )
}