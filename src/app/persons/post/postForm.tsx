"use client"

import {useState} from "react";
import FormNamePool from "@/app/persons/post/formNamePool";
import FormAdditionalInfoPool from './formAdditionalInfoPool';

function PostForm() {

    const [firstNames, setFirstnames] = useState<string[]>(["Etunimi1", "Etunimi2"])
    const [lastNames, setLastNames] = useState<string[]>(["Sukunimi1", "Sukunimi2"])
    const [additionalInfos, setAdditionalInfos] = useState<AdditionalInfo[]>([
        {
            key: "Kengänkoko",
            value: "40"
        }
    ])

    return (
        <form>
            <label>Etunimet</label><br/>
            <FormNamePool names={firstNames} setNames={setFirstnames}/>
            <br/>

            <label>Kutsumanimi</label><br/><br/>
            <select name={"nickname"} id={"nickname"}>
                {
                    firstNames.map((fn, key) => {
                        return (
                            <option value={fn} key={key}>{fn}</option>
                        )
                    })
                }
            </select><br/>
            <br/>

            <label>Sukunimet</label><br/>
            <FormNamePool names={lastNames} setNames={setLastNames}/>
            <br/>

            <label>Käytössä</label><br/>
            <select name={"current"} id={"current"}>
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
            <select name={"nickname"} id={"nickname"}>
                <option value={null}>tba</option>
            </select><br/>
            <br />

            <label>Äiti</label><br/>
            <select name={"nickname"} id={"nickname"}>
                <option value={null}>tba</option>
            </select><br/>
            <br />

            <label>Sukupuoli</label><br/>
            <select name={"gender"} id={"gender"}>
                <option value={null}>-</option>
                <option value={"MALE"}>Mies</option>
                <option value={"FEMALE"}>Nainen</option>
            </select><br/>
            <br/>
            <label>Syntymävuosi</label><br/>
            <input type={"number"} id={"birthYear"} name={"birthYear"} defaultValue={2000}/><br/>
            <br/>

            <label>Syntymäpaikka</label><br/>
            <input type={"text"} id={"birthPlace"} name={"birthPlace"} defaultValue={"Joku sairaala"}/><br/>
            <br/>

            <label>Kuollut</label><br/>
            <input type={"checkbox"} id={"deceased"} name={"deceased"} defaultChecked={false}/><br/>
            <br/>

            <label>Kuolinvuosi</label><br/>
            <input type={"number"} id={"deathYear"} name={"deathYear"} defaultValue={2000}/><br/>
            <br/>

            <label>Kuolinpaikka</label><br/>
            <input type={"text"} id={"deathPlace"} name={"deathPlace"} defaultValue={"Joku eri sairaala"}/><br/>
            <br/>

            <label>Lisätiedot</label><br/>
            <FormAdditionalInfoPool infos={additionalInfos} setInfos={setAdditionalInfos}/>
            <br/>

            <label>Tallenna sukulainen tietokantaan</label><br />
            <input type={"submit"} value={"Tallenna"}/>
        </form>
    )
}

export default PostForm