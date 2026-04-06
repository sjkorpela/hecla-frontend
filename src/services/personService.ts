import {ENDPOINTS} from "@/lib";
import keycloak, { initKeycloak } from "@/lib/keycloak";
import {Person} from "@/types/person";
import {FirstName} from "@/types/firstName";
import {LastName} from "@/types/lastName";
import {PostPerson} from "@/types/postPerson";

interface PersonAndStatus {
    person: Person | null,
    status: number
}

interface PersonArrayAndStatus {
    personArray: Person[] | null,
    status: number
}
export class PersonService {
    public static async getAllPersons(): Promise<PersonArrayAndStatus> {
        await initKeycloak();
        if (keycloak.isTokenExpired()) {
            await keycloak.login();
        }

        const response = await fetch(ENDPOINTS.PERSONS, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });

        const personArray: Person[] = await response.json();
        const status: number = response.status;

        personArray.forEach(person => {
            person.firstNames = person.firstNames ?? []
            person.lastNames = person.lastNames ?? []
            person.additionalInfos = person.additionalInfos ?? []
        })

        return { personArray, status}
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