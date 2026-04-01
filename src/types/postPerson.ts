import {FirstName} from "@/types/firstName";
import {LastName} from "@/types/lastName";
import {AdditionalInfo} from "@/types/additionalInfo";

export interface PostPerson {
    fatherId: number | null,
    motherId: number | null,
    gender: string | null,
    birthYear: number | null,
    birthPlace: string | null,
    deceased: boolean | null,
    deathYear: number | null,
    deathPlace: string | null,
    firstNames: FirstName[] | null,
    lastNames: LastName[] | null,
    additionalInfos: AdditionalInfo[] | null,
}