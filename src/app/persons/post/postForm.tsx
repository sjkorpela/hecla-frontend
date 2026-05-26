"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {AdditionalInfo} from "@/types/additionalInfo";
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
import FormNamePool from "@/components/form/formNamePool";
import FormAdditionalInfoPool from '../../../components/form/formAdditionalInfoPool';
import "./postForm.css";

export default function PostForm() {
    const router = useRouter();

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
            router.push(`/persons/${result.person.id}`)
        }
    }

    return (
        <form onSubmit={(e) => formSubmit(e)} className="persons-post-form">
            <h2>Perustiedot</h2>
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



            <h2>Lisätiedot</h2>

            <section>
                <div className="divide">
                    <label>Lisätiedot:</label>
                    <FormAdditionalInfoPool infos={additionalInfos} setInfos={setAdditionalInfos}/>
                </div>
            </section>



            <h2>Vanhemmuussuhteet</h2>

            <section>
                <div className="divide">
                    <label>Isä</label>
                    {/*<FormPersonSelect persons={personArray} selectedPersonId={fatherId} setSelectedPersonId={setFatherId} testingId={"fatherId"} />*/}
                </div>
                <div className="divide">
                    <label>Äiti</label>
                    {/*<FormPersonSelect persons={personArray} selectedPersonId={motherId} setSelectedPersonId={setMotherId} testingId={"motherId"} />*/}
                </div>
            </section>
            

            <label>Tallenna sukulainen tietokantaan</label><br />
            <input type={"submit"} value={"Tallenna"} name={"post"}/>
        </form>
    )
}
