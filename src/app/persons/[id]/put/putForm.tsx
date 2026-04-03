"use client"

import {useEffect, useState} from "react";
import FormNamePool from "@/components/formNamePool";
import {AdditionalInfo} from "@/types/additionalInfo";
import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import {PostPerson} from "@/types/postPerson";
import {FirstName} from "@/types/firstName";
import {LastName} from "@/types/lastName";
import FormAdditionalInfoPool from "@/components/formAdditionalInfoPool";
import Link from "next/link";

interface Props {
    id: number
}

export default function PutForm({ id }: Props) {

    const [person, setPerson] = useState<Person | null>(null);
    const [fatherId, setFatherId] = useState<number | null>(null);
    const [motherId, setMotherId] = useState<number | null>(null);
    const [personList, setPersonList] = useState<Person[] | null>(null);

    const [firstNames, setFirstnames] = useState<string[]>([])
    const [lastNames, setLastNames] = useState<string[]>([])
    const [additionalInfos, setAdditionalInfos] = useState<AdditionalInfo[]>([])

    useEffect(() => {
        (async () => {
            if (id == null) {
                return;
            }
            const p: Person = await PersonService.getPersonById(id);
            const pl: Person[] = await PersonService.getAllPersons();

            setPerson(p);
            setFatherId(p.fatherId);
            setMotherId(p.motherId);
            setPersonList(pl);

            const fn: FirstName[] = p.firstNames ?? [];
            const ln: LastName[] = p.lastNames ?? [];
            const ai: AdditionalInfo[] = p.additionalInfos ?? [];
            setFirstnames(fn.map(fn => {return fn.name}));
            setLastNames(ln.map(ln => {return ln.name}));
            setAdditionalInfos(ai);
        })();

    }, [id]);

    if (id == null || person == null) {
        return (
            <p>Loading...</p>
        )
    }

    async function formSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.target);

        const postFirstNames: FirstName[] = firstNames.map((n, i) => {
            if (i == Number(form.get("nickname"))) {
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
            if (i == Number(form.get("current"))) {
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
            fatherId: form.get("fatherId") == "null" ? null : Number(form.get("fatherId")),
            motherId: form.get("motherId") == "null" ? null : Number(form.get("motherId")),
            gender: form.get("gender") == "null" ? null : String(form.get("gender")),
            birthYear: Number(form.get("birthYear")) == 0 ? null : Number(form.get("birthYear")),
            birthPlace: form.get("birthPlace") == "" ? null : String(form.get("birthPlace")),
            deceased: form.get("deceased") == "on",
            deathYear: Number(form.get("deathYear")) == 0 ? null : Number(form.get("deathYear")),
            deathPlace: form.get("deathPlace") == "" ? null : String(form.get("deathPlace")),
            firstNames: postFirstNames,
            lastNames: postLastNames,
            additionalInfos: additionalInfos
        }

        // console.log("POST", person)
        const result = await PersonService.putPerson(id, person);
        // console.log("RESPONSE", result)

        if (result == 200) {
            alert("Muokkaus onnistui");
        } else {
            alert("Jokin meni vikaan?")
        }

    }

    return (
        <form onSubmit={(e) => formSubmit(e)}>
            <label>Etunimet</label><br/>
            <FormNamePool names={firstNames} setNames={setFirstnames} placeholder={"Etunimi"}/>
            <br/>

            <label>Kutsumanimi</label><br/>
            <select name={"nickname"} defaultValue={firstNames.indexOf(PersonService.getPersonsNickname(person.firstNames) ?? "")}>
                <option value={-1}>Valitse</option>
                {
                    firstNames.map((fn, key) => {
                        return (
                            <option value={key} key={key}>{fn}</option>
                        )
                    })
                }
            </select><br/>
            <br/>

            <label>Sukunimet</label><br/>
            <FormNamePool names={lastNames} setNames={setLastNames} placeholder={"Sukunimi"}/>
            <br/>

            <label>Käytössä</label><br/>
            <select name={"current"} defaultValue={lastNames.indexOf(PersonService.getPersonsCurrentLastName(person.lastNames) ?? "")}>
                <option value={-1}>Valitse</option>
                {
                    lastNames.map((ln, key) => {
                        return (
                            <option value={key} key={key}>{ln}</option>
                        )
                    })
                }
            </select><br/>
            <br/>

            <label>Isä</label><br/>
            <select name={"fatherId"} defaultValue={fatherId ?? "null"}>
                <option value={"null"}>Valitse</option>
                {
                    personList?.map((person, key) => {
                        if (person.id == id) {
                            return null;
                        }
                        return (
                            <option value={person.id} key={key}>
                                {person.id} {PersonService.getPersonsFirstAndLastName(person)}
                            </option>
                        )
                    })
                }
            </select><br/>
            <br />

            <label>Äiti</label><br/>
            <select name={"motherId"} defaultValue={motherId ?? "null"}>
                <option value={"null"}>Valitse</option>
                {
                    personList?.map((person, key) => {
                        if (person.id == id) {
                            return null;
                        }
                        return (
                            <option value={person.id} key={key}>
                                {person.id} {PersonService.getPersonsFirstAndLastName(person)}
                            </option>
                        )
                    })
                }
            </select><br/>
            <br />

            <label>Sukupuoli</label><br/>
            <select name={"gender"} id={"gender"} defaultValue={person.gender ?? "null"}>
                <option value={"null"}>Valitse</option>
                <option value={"MALE"}>Mies</option>
                <option value={"FEMALE"}>Nainen</option>
            </select><br/>
            <br/>
            <label>Syntymävuosi</label><br/>
            <input type={"number"} name={"birthYear"} placeholder={"####"} defaultValue={person.birthYear}/><br/>
            <br/>

            <label>Syntymäpaikka</label><br/>
            <input type={"text"} name={"birthPlace"} placeholder={"Sijainti"} defaultValue={person.birthPlace}/><br/>
            <br/>

            <label>Kuollut</label><br/>
            <input type={"checkbox"} name={"deceased"} defaultChecked={person.deceased}/><br/>
            <br/>

            <label>Kuolinvuosi</label><br/>
            <input type={"number"} name={"deathYear"} placeholder={"####"} defaultValue={person.deathYear}/><br/>
            <br/>

            <label>Kuolinpaikka</label><br/>
            <input type={"text"} name={"deathPlace"} placeholder={"Sijainti"} defaultValue={person.deathPlace}/><br/>
            <br/>

            <label>Lisätiedot</label><br/>
            <FormAdditionalInfoPool infos={additionalInfos} setInfos={setAdditionalInfos}/>
            <br/>

            <label>Tallenna muutokset tietokantaan</label><br />
            <input type={"submit"} value={"Tallenna"} name={"put"}/><br />
            <br />
            <br />
            <br />

            <h2>LISÄVAIHTOEHDOT</h2>
            <li><Link href={`/persons/${id}/delete`}><u>Poista sukulainen</u></Link></li>
        </form>
    )
}
