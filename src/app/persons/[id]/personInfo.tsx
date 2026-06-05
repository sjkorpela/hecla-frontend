"use client";

import {PersonService} from "@/services/personService";
import AdditionalInfoItem from "@/app/persons/[id]/additionalInfoItem";
import usePerson from "@/hooks/usePerson";
import {useRouter} from "next/navigation";
import "./personInfo.css";
import Image from 'next/image'
import {switchCase} from "@babel/types";
import PersonImage from "@/app/persons/[id]/personImage";
import {useEffect} from "react";

interface Props {
    id: number
}

export default function PersonInfo({ id }: Props) {
    const router = useRouter();

    const { loading, person, status } = usePerson(id)
    const { loading: fatherLoading, person: father, status: fatherStatus } = usePerson(person?.fatherId)
    const { loading: motherLoading, person: mother, status: motherStatus } = usePerson(person?.motherId)

    useEffect(() => {
        if (status == 404) {
            router.push("/persons/refresh")
        }
    }, [status]);

    if (id == null || person == null) {
        return null;
    }

    const personName = PersonService.getPersonsFirstAndLastName(person)

    let allFirstNames = ""
    for (let i = 0; i < person.firstNames?.length; i++) {
        if (i == person.firstNames.length - 1) {
            allFirstNames += person.firstNames[i].name
        } else {
            allFirstNames += person.firstNames[i].name + ", "
        }
    }

    let allLastNames = ""
    for (let i = 0; i < person.lastNames?.length; i++) {
        if (i == person.lastNames.length - 1) {
            allLastNames += person.lastNames[i].name
        } else {
            allLastNames += person.lastNames[i].name + ", "
        }
    }

    let gender = "N/A"
    if (person.gender == "MALE") { gender = "Mies"}
    else if (person.gender == "FEMALE") {gender = "Nainen"}

    const birthInfo = `${person.birthYear ?? "N/A"}, ${person.birthPlace ?? "N/A"}`
    const deathInfo = `${person.deathYear ?? "N/A"}, ${person.deathPlace ?? "N/A"}`

    const fatherExists = !fatherLoading && father != null;
    const motherExists = !motherLoading && mother != null;

    function navClose() { router.push("/persons/refresh"); }
    function navEdit() { router.push(`/persons/${id}/put`); }
    function navDelete() { router.push(`/persons/${id}/delete`); }

    return (
        <div className="person-info-wrapper">

            <header>
                <button className="icon-button" onClick={navEdit} >edit</button>
                <button className="icon-button" onClick={navDelete} >delete</button>
            </header>

            <div className="person-info">
                <div className="person-info-left">
                    <PersonImage person={person} size={200} />
                    <h3>Vanhemmat</h3>
                    <div className="person-images">
                        { fatherExists ? <PersonImage person={father} size={95} link={true}/> : ""}
                        { motherExists ? <PersonImage person={mother} size={95} link={true}/> : ""}
                        { !fatherExists && !motherExists ? "N/A" : ""}
                    </div>
                </div>

                <div className="person-info-middle">
                    <h1>{personName?.toUpperCase() ?? "N/A"}</h1>

                    <h3>PERUSTIEDOT</h3>
                    <div className="person-info-item">
                        <div>Etunimet:</div>
                        <div>{allFirstNames}</div>
                    </div>
                    <div className="person-info-item">
                        <div>Sukunimet:</div>
                        <div>{allLastNames}</div>
                    </div>
                    <div className="person-info-item">
                        <div>Sukupuoli:</div>
                        <div>{gender}</div>
                    </div>
                    <div className="person-info-item">
                        <div>Syntynyt:</div>
                        <div>{birthInfo}</div>
                    </div>
                    <div className="person-info-item">
                        <div>Kuollut:</div>
                        <div>{deathInfo}</div>
                    </div>

                    <h3>LISÄTIEDOT</h3>
                    {
                        person.additionalInfos?.map((ai, key) => {
                            return <AdditionalInfoItem info={ai} key={key}/>;
                        })
                    }
                </div>
            </div>
        </div>
    )
}