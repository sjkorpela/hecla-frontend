import {FirstName} from "@/types/firstName";
import {LastName} from "@/types/lastName";
import {AdditionalInfo} from "@/types/additionalInfo";

export interface Person {
    id: number,
    fatherId: number,
    motherId: number,
    gender: string,
    birthYear: number,
    birthPlace: string,
    deceased: boolean,
    deathYear: number,
    deathPlace: string,
    firstNames: FirstName[],
    lastNames: LastName[],
    additionalInfos: AdditionalInfo[],
}