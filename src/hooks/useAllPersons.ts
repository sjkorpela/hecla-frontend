import {useEffect, useRef, useState} from "react";
import {PersonService} from "@/services/personService";
import {Person} from "@/types/person";
import {PersonsFilter} from "@/types/personsFilter";

interface AllPersonsState {
    loading: boolean
    personArray: Person[] | null
    status: number | null
}

export default function useAllPersons(onLoad?: (personArray: Person[]) => void): AllPersonsState {

    const [state, setState] = useState<AllPersonsState>({
        loading: true,
        personArray: null,
        status: null
    });

    const onLoadRef = useRef(onLoad);
    useEffect(() => { onLoadRef.current = onLoad; });

    useEffect(() => {
        (async () => {
            const { page , status } = await PersonService.getAllPersons();
            const personArray = page.content;

            setState({
                loading: false,
                personArray: status == 200 ? personArray : null,
                status: status
            })

            if (status == 200 && personArray != null && onLoadRef.current != null) {
                onLoadRef.current(personArray);
            }
        })()
    }, []);

    return state;
}