import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {PersonsSort} from "@/types/personsSort";
import {PersonsFilter} from "@/types/personsFilter";
import {Gender} from "@/types/gender";
import FormCheckbox from "@/components/form/formCheckbox";
import AllPersonsTableFilterOption from "@/app/persons/allPersonsTableFilterOption";
import FormGenderSelect from "@/components/form/formGenderSelect";
import FormYearInput from "@/components/form/formYearInput";

interface Props {
    filter: PersonsFilter | undefined
    setFilter: Dispatch<SetStateAction<PersonsFilter | undefined>>
}
export default function AllPersonsTableFilter({filter, setFilter}: Props) {

    const [deceased, setDeceased] = useState<boolean | null>(filter?.deceased ?? null);
    const [gender, setGender] = useState<Gender | null>(filter?.gender ?? null)

    const [bornAfter, setBornAfter] = useState<number | null>(filter?.bornAfter ?? null)
    const [bornAfterActive, setBornAfterActive] = useState<boolean | null>(false)

    const [bornBefore, setBornBefore] = useState<number | null>(filter?.bornBefore ?? null)
    const [bornBeforeActive, setBornBeforeActive] = useState<boolean | null>(false)

    const [diedAfter, setDiedAfter] = useState<number | null>(filter?.diedAfter ?? null)
    const [diedAfterActive, setDiedAfterActive] = useState<boolean | null>(false)

    const [diedBefore, setDiedBefore] = useState<number | null>(filter?.diedBefore ?? null)
    const [diedBeforeActive, setDiedBeforeActive] = useState<boolean | null>(false)

    useEffect(() => {
        setFilter({
            deceased: deceased,
            gender: gender,
            bornAfter: bornAfterActive ? bornAfter : null,
            bornBefore: bornBeforeActive ? bornBefore : null,
            diedAfter: diedAfterActive ? diedAfter : null,
            diedBefore: diedBeforeActive ? diedBefore : null,
        })
    }, [setFilter, deceased, gender, bornBefore, diedAfter, diedBefore, bornAfterActive, bornAfter, bornBeforeActive, diedAfterActive, diedBeforeActive]);

    function parseDeceased(value: string) {
        if (value == "true") return true;
        if (value == "false") return false;
        else return null;
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td>Elossa:</td>
                    <td>
                        <select
                            onChange={(e) => setDeceased(
                                parseDeceased(e.target.value)
                            )}
                            name={"alive"}
                        >
                            <option value={"null"}>Valitse</option>
                            <option value={"true"}>Elossa</option>
                            <option value={"false"}>Kuollut</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Sukupuoli:</td>
                    <td>
                        <select
                            onChange={(e) => setGender(
                                e.target.value == "null" ? null : e.target.value as Gender
                            )}
                            name={"gender"}
                        >
                            <option value={"null"}>Valitse</option>
                            <option value={Gender.Male.valueOf()}>Mies</option>
                            <option value={Gender.Female.valueOf()}>Nainen</option>
                            {/*<option value={"unknown"}>Ei merkitty</option>*/}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Syntynyt jälkeen:</td>
                    <td>
                        <FormYearInput year={bornAfter} setYear={setBornAfter} testingId={"bornAfter"} />
                        <FormCheckbox state={bornAfterActive} setState={setBornAfterActive} testingId={"bornAfterActive"} />
                    </td>
                </tr>
                <tr>
                    <td>Syntynyt ennen:</td>
                    <td>
                        <FormYearInput year={bornBefore} setYear={setBornBefore} testingId={"bornBefore"} />
                        <FormCheckbox state={bornBeforeActive} setState={setBornBeforeActive} testingId={"bornBeforeActive"} />
                    </td>
                </tr>
                <tr>
                    <td>Kuollut jälkeen:</td>
                    <td>
                        <FormYearInput year={diedAfter} setYear={setDiedAfter} testingId={"diedAfter"} />
                        <FormCheckbox state={diedAfterActive} setState={setDiedAfterActive} testingId={"diedAfterActive"} />
                    </td>
                </tr>
                <tr>
                    <td>Kuollut ennen:</td>
                    <td>
                        <FormYearInput year={diedBefore} setYear={setDiedBefore} testingId={"diedBefore"} />
                        <FormCheckbox state={diedBeforeActive} setState={setDiedBeforeActive} testingId={"diedBeforeActive"} />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}