"use client"

import Image from "next/image";
import {Person} from "@/types/person";
import {useRouter} from "next/navigation";
import "./personImage.css"
import {PersonService} from "@/services/personService";

interface Props {
    person?: Person | null,
    size?: number,
    link?: boolean,
}
export default function PersonImage({person, size = 100, link = false}: Props) {
    const router = useRouter();

    const personImageSrc = person == null ? "/gray.svg" : person.gender == "MALE" ? "/blue.svg" : person.gender == "FEMALE" ? "/red.svg" : "/gray.svg";

    const doLink: boolean = link && person != null && person.id != null && person.id >= 0;
    function toPage() {
        if (!doLink) return;

        router.push(`/persons/${person?.id}`);
    }

    return (
        <div className={`person-image-component${doLink ? " link" : ""}`} onClick={toPage}>
            { link ? <div className="name-plate">{PersonService.getPersonsFirstAndLastName(person ?? null)}</div> : null}
            <Image
                className="image"
                src={personImageSrc}
                width={size}
                height={size}
                alt="Blob person"
            />
        </div>
    )
}