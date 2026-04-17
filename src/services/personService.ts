import {ENDPOINTS} from "@/lib";
import keycloak, { initKeycloak } from "@/lib/keycloak";
import {Person} from "@/types/person";
import {FirstName} from "@/types/firstName";
import {LastName} from "@/types/lastName";
import {PostPerson} from "@/types/postPerson";
import {Page} from "@/types/page";
import {PersonsFilter} from "@/types/personsFilter";
import {PersonsSort} from "@/types/personsSort";

interface PersonAndStatus {
    person: Person | null,
    status: number
}

interface PersonArrayAndStatus {
    personArray: Person[] | null,
    status: number
}

interface PersonPageAndStatus {
    page: Page,
    status: number
}
export class PersonService {
    public static async getAllPersons(pageNumber?: number, size?: number, sort?: PersonsSort, filter?: PersonsFilter): Promise<PersonPageAndStatus> {
        await initKeycloak();
        if (keycloak.isTokenExpired()) {
            await keycloak.login();
        }

        // handle sort & filter

        let params = "?";

        if (filter != null) {
            if (filter.deceased != null) params += `deceased=${filter.deceased}&`
            if (filter.gender != null) params += `gender=${filter.gender}&`
            if (filter.bornAfter != null) params += `bornAfter=${filter.bornAfter}`
            if (filter.bornBefore != null) params += `bornBefore=${filter.bornBefore}`
            if (filter.diedAfter != null) params += `diedAfter=${filter.diedAfter}`
            if (filter.diedBefore != null) params += `diedBefore=${filter.diedBefore}`
        }

        const response = await fetch(ENDPOINTS.PERSONS + params, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });

        const page: Page = await response.json();
        const status: number = response.status;

        page.content.forEach(person => {
            person.firstNames = person.firstNames ?? []
            person.lastNames = person.lastNames ?? []
            person.additionalInfos = person.additionalInfos ?? []
        })

        return { page, status}
    }

    public static async getPersonById(id: number): Promise<PersonAndStatus> {
        await initKeycloak();
        if (keycloak.isTokenExpired()) {
            await keycloak.login();
        }

        const response = await fetch(`${ENDPOINTS.PERSONS}/${id}`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });

        const person: Person = await response.json();
        const status: number = response.status;

        person.firstNames = person.firstNames ?? []
        person.lastNames = person.lastNames ?? []
        person.additionalInfos = person.additionalInfos ?? []

        return { person, status}
    }

    public static async postPerson(postPerson: PostPerson): Promise<PersonAndStatus> {
        await initKeycloak();
        if (keycloak.isTokenExpired()) {
            await keycloak.login();
        }

        const response = await fetch(ENDPOINTS.PERSONS, {
            method: "POST",
            body: JSON.stringify(postPerson),
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
            },
        });

        const person: Person = await response.json();
        const status: number = response.status;

        return { person, status}
    }

    public static async putPerson(id: number, person: PostPerson): Promise<number> {
        if (keycloak.isTokenExpired()) {
            await keycloak.login();
        }

        const response = await fetch(`${ENDPOINTS.PERSONS}/${id}`, {
            method: "PUT",
            body: JSON.stringify(person),
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
            },
        });

        return response.status;
    }

    public static async deletePerson(id: number): Promise<number> {
        if (keycloak.isTokenExpired()) {
            await keycloak.login();
        }

        const response = await fetch(`${ENDPOINTS.PERSONS}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });

        return response.status;
    }

    public static getPersonsNickname(firstNames: FirstName[]): string | null {
        if (firstNames == null) {
            return null;
        }
        const temp = firstNames.filter(fn => fn.nickname);
        return temp.length > 0 && temp[0].name != "" ? temp[0].name : null;
    }

    public static getPersonsCurrentLastName(lastNames: LastName[]): string | null {
        if (lastNames == null) {
            return null;
        }
        const temp = lastNames.filter(ln => ln.current);
        return temp.length > 0 && temp[0].name != "" ? temp[0].name : null;
    }

    public static getPersonsFirstAndLastName(person: Person | null): string | null {
        if (person == null) {
            return null;
        }
        const firstName = PersonService.getPersonsNickname(person.firstNames) ?? "N/A";
        const lastName = PersonService.getPersonsCurrentLastName(person.lastNames) ?? "N/A";

        return `${firstName} ${lastName}`;
    }
}