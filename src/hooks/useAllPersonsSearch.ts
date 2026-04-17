import {useEffect, useRef, useState} from "react";
import {PersonService} from "@/services/personService";
import {Person} from "@/types/person";
import {PersonsFilter} from "@/types/personsFilter";
import * as sea from "node:sea";

interface Props {
    searchQuery: string,
    onLoad?: (personArray: Person[]) => void
}

interface AllPersonsState {
    loading: boolean
    personArray: Person[] | null
    status: number | null
}

export default function useAllPersonsSearch({searchQuery, onLoad}: Props): AllPersonsState {

    const [state, setState] = useState<AllPersonsState>({
        loading: true,
        personArray: null,
        status: null
    });

    const onLoadRef = useRef(onLoad);
    useEffect(() => { onLoadRef.current = onLoad; });

    useEffect(() => {
        // Race condition
        let expired = false;

        (async () => {
            setState({
                loading: true,
                personArray: null,
                status: null
            })

            const { page , status } = await PersonService.getAllPersons({searchQuery: searchQuery});

            if (expired) return;

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

        return () => { expired = true; };
    }, [searchQuery]);

    return state;
}