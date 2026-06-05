"use client"

import {useEffect, useState} from "react";
import FormNamePool from "@/components/form/formNamePool";
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
import {useRouter} from "next/navigation";
import usePerson from "@/hooks/usePerson";
import FormAdditionalInfoPool from "@/components/form/formAdditionalInfoPool";
import "./putForm.css"

interface Props {
    id: number
}

export default function PutForm({ id }: Props) {
    const router = useRouter();

    const { loading: personLoading, person, status: personStatus } = usePerson(id, getValuesFromPerson)
    const { loading: personArrayLoading, personArray, status: personArrayStatus } = useAllPersons()

    const [firstNames, setFirstnames] = useState<string[]>([]);
    const [nickname, setNickname] = useState<number | null>(null);

    const [lastNames, setLastNames] = useState<string[]>([]);
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

    if (personStatus == 404) {
        router.push("/persons")
    }

    function getValuesFromPerson(person: Person) {
        setFirstnames(
            person?.firstNames?.map(fn => {
                return fn.name;
            }) ?? []
        )
        setNickname(
            person?.firstNames.map((fn, i) => {
                if (fn.nickname) {
                    return i;
                }
            })[0] ?? null
        )
        setLastNames(
            person?.lastNames?.map(ln => {
                return ln.name;
            }) ?? []
        )
        setCurrent(
            person?.lastNames.map((ln, i) => {
                if (ln.current) {
                    return i;
                }
            })[0] ?? null
        )
        setFatherId(person?.fatherId ?? null)
        setMotherId(person?.motherId ?? null)
        setGender(person?.gender as Gender ?? null)
        setBirthYear(person?.birthYear ?? null)
        setBirthPlace(person?.birthPlace ?? null)
        setDeceased(person?.deceased ?? null)
        setDeathYear(person?.deathYear ?? null)
        setDeathPlace(person?.deathPlace ?? null)
        setAdditionalInfos(person?.additionalInfos ?? [])
    }

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

        const status = await PersonService.putPerson(id, person);

        if (status == 200) {
            router.push(`/persons/${id}`)
        }
    }

    function navBack() { router.back(); }

    return (
        <div className="person-put-form">
            <form onSubmit={(e) => formSubmit(e)}>
                <h1>MUOKKAA SUKULAISTA</h1>
                <h3>Perustiedot</h3>
                <section>
                    <div className="divide">
                        <label>Etunimet:</label>
                        <FormNamePool names={firstNames} setNames={setFirstnames} placeholder={"Etunimi"} testingId={"firstName"}/>
                    </div>

                    <div className="divide">
                        <label>Kutsumanimi:</label>
                        <FormNameSelect names={firstNames} setSelectedName={setNickname} testingId={"nickname"} />
                    </div>
                </section>

                <section>
                    <div className="divide">
                        <label>Sukunimet:</label>
                        <FormNamePool names={lastNames} setNames={setLastNames} placeholder={"Sukunimi"} testingId={"lastName"}/>
                    </div>

                    <div className="divide">
                        <label>Käytössä:</label>
                        <FormNameSelect names={lastNames} setSelectedName={setCurrent} testingId={"current"} />
                    </div>
                </section>

                <section>
                    <div className="divide">
                        <label>Sukupuoli:</label>
                        <FormGenderSelect gender={gender} setSelectedGender={setGender} testingId={"gender"} />
                    </div>
                </section>

                <section>
                    <div className="divide">
                        <label>Syntymävuosi:</label>
                        <FormYearInput year={birthYear} setYear={setBirthYear} testingId={"birthYear"}/>
                    </div>
                    <div className="divide">
                        <label>Syntymäpaikka:</label>
                        <FormTextInput text={birthPlace} setText={setBirthPlace} placeholder={"Sijainti"} testingId={"birthPlace"}/>
                    </div>
                </section>

                <section>
                    <div className="divide">
                        <label>Kuolinvuosi:</label>
                        <FormYearInput year={deathYear} setYear={setDeathYear} testingId={"deathYear"}/>
                    </div>
                    <div className="divide">
                        <label>Kuolinpaikka:</label>
                        <FormTextInput text={deathPlace} setText={setDeathPlace} placeholder={"Sijainti"} testingId={"deathPlace"}/>
                    </div>
                    <div className="divide">
                        <label>Kuollut:</label>
                        <FormCheckbox state={deceased} setState={setDeceased} testingId={"deceased"}/>
                    </div>
                </section>



                <h3>Lisätiedot</h3>

                <section>
                    <div className="divide">
                        <label>Lisätiedot:</label>
                        <FormAdditionalInfoPool infos={additionalInfos} setInfos={setAdditionalInfos}/>
                    </div>
                </section>



                <h3>Vanhemmuussuhteet</h3>

                <section>
                    <div className="divide">
                        <label>Isä:</label>
                        <FormPersonSelect selectedPersonId={fatherId} setSelectedPersonId={setFatherId} testingId={"fatherId"} />
                    </div>
                    <div className="divide">
                        <label>Äiti:</label>
                        <FormPersonSelect selectedPersonId={motherId} setSelectedPersonId={setMotherId} testingId={"motherId"} />
                    </div>
                </section>


                <label>Tallenna muutokset</label>
                <button type={"submit"} name={"post"}>Tallenna</button>
            </form>

            <div className="right">
                <button className="icon-button" onClick={navBack} >arrow_back</button>
            </div>
        </div>
    )
}
