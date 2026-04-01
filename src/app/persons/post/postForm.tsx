"use client"

import {useEffect, useState} from "react";
import FormNamePool from "@/app/persons/post/formNamePool";
import FormAdditionalInfoPool from './formAdditionalInfoPool';
import {AdditionalInfo} from "@/types/additionalInfo";
import {Person} from "@/types/person";
import {PersonService} from "@/services/personService";
import {PostPerson} from "@/types/postPerson";
import {FirstName} from "@/types/firstName";
import {LastName} from "@/types/lastName";

export default function PostForm() {

    const [firstNames, setFirstnames] = useState<string[]>([""])
    const [lastNames, setLastNames] = useState<string[]>([""])
    const [additionalInfos, setAdditionalInfos] = useState<AdditionalInfo[]>([
        {
            key: "Kengänkoko",
            value: "40"
        }
    ])

    const [personList, setPersonList] = useState<Person[] | null>(null);

    useEffect(() => {
        if (personList == null) {
            PersonService.getAllPersons().then(setPersonList);
        }
    }, [personList]);

    function formSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        // console.log(form.get("gender") == "null");
        if (form.get("gender") == "null") {

        }

        console.log(form)

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

        console.log("POST", person)
    }

    return (
        <form onSubmit={formSubmit}>
            <label>Etunimet</label><br/>
            <FormNamePool names={firstNames} setNames={setFirstnames} placeholder={"Etunimi"}/>
            <br/>

            <label>Kutsumanimi</label><br/>
            <select name={"nickname"}>
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
            <select name={"current"}>
                {
                    lastNames.map((ln, key) => {
                        return (
                            <option value={ln} key={key}>{ln}</option>
                        )
                    })
                }
            </select><br/>
            <br/>

            <label>Isä</label><br/>
            <select name={"fatherId"}>
                <option value={"null"}>Valitse</option>
                {
                    personList?.map((person, key) => {
                        return (
                            <option value={person.id} key={key}>{person.id} {PersonService.getPersonsFirstAndLastName(person)}</option>
                        )
                    })
                }
            </select><br/>
            <br />

            <label>Äiti</label><br/>
            <select name={"motherId"}>
                <option value={"null"}>Valitse</option>
                {
                    personList?.map((person, key) => {
                        return (
                            <option value={person.id} key={key}>{person.id} {PersonService.getPersonsFirstAndLastName(person)}</option>
                        )
                    })
                }
            </select><br/>
            <br />

            <label>Sukupuoli</label><br/>
            <select name={"gender"} id={"gender"}>
                <option value={"null"}>-</option>
                <option value={"MALE"}>Mies</option>
                <option value={"FEMALE"}>Nainen</option>
            </select><br/>
            <br/>
            <label>Syntymävuosi</label><br/>
            <input type={"number"} name={"birthYear"} defaultValue={2000}/><br/>
            <br/>

            <label>Syntymäpaikka</label><br/>
            <input type={"text"} name={"birthPlace"} defaultValue={"Joku sairaala"}/><br/>
            <br/>

            <label>Kuollut</label><br/>
            <input type={"checkbox"} name={"deceased"} defaultChecked={false}/><br/>
            <br/>

            <label>Kuolinvuosi</label><br/>
            <input type={"number"} name={"deathYear"} defaultValue={2000}/><br/>
            <br/>

            <label>Kuolinpaikka</label><br/>
            <input type={"text"} name={"deathPlace"} defaultValue={"Joku eri sairaala"}/><br/>
            <br/>

            <label>Lisätiedot</label><br/>
            <FormAdditionalInfoPool infos={additionalInfos} setInfos={setAdditionalInfos}/>
            <br/>

            <label>Tallenna sukulainen tietokantaan</label><br />
            <input type={"submit"} value={"Tallenna"}/>
        </form>
    )
}
