import {useEffect, useRef, useState} from "react";
import {PersonService} from "@/services/personService";
import {PersonsFilter} from "@/types/personsFilter";
import {PersonsSort} from "@/types/personsSort";
import {Page} from "@/types/page";

interface AllPersonsPagedState {
    loading: boolean
    page: Page | null
    status: number | null
}

export default function useAllPersonsPaged(
    pageNumber?: number,
    size?: number,
    onLoad?: (page: Page) => void,
    sort?: PersonsSort,
    filter?: PersonsFilter
): AllPersonsPagedState {

    const [state, setState] = useState<AllPersonsPagedState>({
        loading: true,
        page: null,
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
                page: null,
                status: null
            })

            const { page , status } = await PersonService.getAllPersons(pageNumber, size, sort, filter);

            if (expired) return;

            setState({
                loading: false,
                page: status == 200 ? page : null,
                status: status
            })

            if (status == 200 && page != null && onLoadRef.current != null) {
                onLoadRef.current(page);
            }
        })()

        return () => { expired = true; };
    }, [filter, sort]);

    return state;
}