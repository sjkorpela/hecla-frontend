import {ReactNode, useState} from "react";
import FormCheckbox from "@/components/form/formCheckbox";

interface Props {
    name: string,
    setFilterElement: ReactNode
}

export default function AllPersonsTableFilterOption({name, setFilterElement}: Props) {
    const [active, setActive] = useState<boolean | null>(false);

    if (active) {
        return (
            <tr>
                <td>
                    <FormCheckbox state={active} setState={setActive} testingId={name} />
                </td>
                <td>{name}</td>
                <td>{setFilterElement}</td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td>
                    <FormCheckbox state={active} setState={setActive} testingId={name} />
                </td>
                <td>{name}</td>
                <td>---</td>
            </tr>
            )
    }
}