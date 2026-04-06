import {useEffect, useRef, useState} from "react";
import {PersonService} from "@/services/personService";
import {Person} from "@/types/person";

interface PersonState {
    loading: boolean
    person: Person | null
    status: number | null
}

export default function usePerson(id: number | undefined, onLoad?: (person: Person) => void): PersonState {

    const [state, setState] = useState<PersonState>({
        loading: true,
        person: null,
        status: null
    });

    const onLoadRef = useRef(onLoad);
    useEffect(() => { onLoadRef.current = onLoad; });

    useEffect(() => {
        if (id == null) {
            return;
        }

        (async () => {
            const { person, status } = await PersonService.getPersonById(id);

            setState({
                loading: false,
                person: status == 200 ? person : null,
                status: status
            })

            if (status == 200 && person != null && onLoadRef.current != null) {
                onLoadRef.current(person);
            }
        })()
    }, [id]);

    return state;
}