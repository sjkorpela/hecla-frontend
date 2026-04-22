"use client"

import {useEffect, useState} from "react";
import FormNamePool from "@/components/form/formNamePool";
import FormAdditionalInfoPool from '../../../components/form/formAdditionalInfoPool';
import {AdditionalInfo} from "@/types/additionalInfo";
import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import {PostPerson} from "@/types/postPerson";
import {FirstName} from "@/types/firstName";
import {LastName} from "@/types/lastName";
import {Gender} from "@/types/gender";
import useAllPersons from "@/hooks/useAllPersons";
import FormNameSelect from "@/components/form/formNameSelect";
import FormPersonSelect from "@/components/form/formPersonSelect";
import FormGenderSelect from "@/components/form/formGenderSelect";
import FormYearInput from "@/components/form/formYearInput";
import FormTextInput from "@/components/form/formTextInput";
import FormCheckbox from "@/components/form/formCheckbox";
import {redirect} from "next/navigation";

export default function PostForm() {

    const { loading, personArray, status } = useAllPersons()

    const [firstNames, setFirstnames] = useState<string[]>([])
    const [nickname, setNickname] = useState<number | null>(null);

    const [lastNames, setLastNames] = useState<string[]>([])
    const [current, setCurrent] = useState<number | null>(null);

    const [fatherId, setFatherId] = useState<number | null>(null)
    const [motherId, setMotherId] = useState<number | null>(null)

    const [gender, setGender] = useState<Gender | null>(null)

    const [birthYear, setBirthYear] = useState<number | null>(null)
    const [birthPlace, setBirthPlace] = useState<string | null>(null)

    const [deceased, setDeceased] = useState<boolean | null>(null)

    const [deathYear, setDeathYear] = useState<number | null>(null)
    const [deathPlace, setDeathPlace] = useState<string | null>(null)

    const [additionalInfos, setAdditionalInfos] = useState<AdditionalInfo[]>([])

    async function formSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const postFirstNames: FirstName[] = firstNames.map((n, i) => {
            if (i == nickname) {
                return {
                    name: n,
                    nickname: true
                }
            } else {
                return {
                    name: n,
                    nickname: false
                }
            }
        })

        const postLastNames: LastName[] = lastNames.map((n, i) => {
            if (i == current) {
                return {
                    name: n,
                    current: true
                }
            } else {
                return {
                    name: n,
                    current: false
                }
            }
        })

        const person: PostPerson = {
            fatherId: fatherId,
            motherId: motherId,
            gender: gender,
            birthYear: birthYear,
            birthPlace: birthPlace,
            deceased: deceased,
            deathYear: deathYear,
            deathPlace: deathPlace,
            firstNames: postFirstNames,
            lastNames: postLastNames,
            additionalInfos: additionalInfos
        }

        const result = await PersonService.postPerson(person);

        if (result.status == 201 && result.person != null) {
            redirect(`/persons/${result.person.id}`)
        }
    }

    return (
        <form onSubmit={(e) => formSubmit(e)}>
            <label>Etunimet</label><br/>
            <FormNamePool names={firstNames} setNames={setFirstnames} placeholder={"Etunimi"} testingId={"firstName"}/>
            <br/>

            <label>Kutsumanimi</label><br/>
            <FormNameSelect names={firstNames} setSelectedName={setNickname} testingId={"nickname"} /><br/>
            <br/>

            <label>Sukunimet</label><br/>
            <FormNamePool names={lastNames} setNames={setLastNames} placeholder={"Sukunimi"} testingId={"lastName"}/>
            <br/>

            <label>Käytössä</label><br/>
            <FormNameSelect names={lastNames} setSelectedName={setCurrent} testingId={"current"} /><br/>
            <br/>

            <label>Isä</label><br/>
            <FormPersonSelect persons={personArray} selectedPersonId={fatherId} setSelectedPersonId={setFatherId} testingId={"fatherId"} /><br/>
            <br/>

            <label>Äiti</label><br/>
            <FormPersonSelect persons={personArray} selectedPersonId={motherId} setSelectedPersonId={setMotherId} testingId={"motherId"} /><br/>
            <br/>

            <label>Sukupuoli</label><br/>
            <FormGenderSelect gender={gender} setSelectedGender={setGender} testingId={"gender"} /><br/>
            <br/>

            <label>Syntymävuosi</label><br/>
            <FormYearInput year={birthYear} setYear={setBirthYear} testingId={"birthYear"}/><br/>
            <br/>

            <label>Syntymäpaikka</label><br/>
            <FormTextInput text={birthPlace} setText={setBirthPlace} placeholder={"Sijainti"} testingId={"birthPlace"}/><br/>
            <br/>

            <label>Kuollut</label><br/>
            <FormCheckbox state={deceased} setState={setDeceased} testingId={"deceased"}/><br/>
            <br/>

            <label>Kuolinvuosi</label><br/>
            <FormYearInput year={deathYear} setYear={setDeathYear} testingId={"deathYear"}/><br/>
            <br/>

            <label>Kuolinpaikka</label><br/>
            <FormTextInput text={deathPlace} setText={setDeathPlace} placeholder={"Sijainti"} testingId={"deathPlace"}/><br/>
            <br/>

            <label>Lisätiedot</label><br/>
            <FormAdditionalInfoPool infos={additionalInfos} setInfos={setAdditionalInfos}/><br/>
            <br/>

            <label>Tallenna sukulainen tietokantaan</label><br />
            <input type={"submit"} value={"Tallenna"} name={"post"}/>
        </form>
    )
}
