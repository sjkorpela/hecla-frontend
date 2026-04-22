import {Gender} from "@/types/gender";

export interface PersonsFilter {
    deceased: boolean | null,
    gender: Gender | null,
    bornAfter: number | null,
    bornBefore: number | null,
    diedAfter: number | null,
    diedBefore: number | null
}