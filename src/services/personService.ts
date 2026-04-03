import {ENDPOINTS} from "@/lib";
import keycloak, { initKeycloak } from "@/lib/keycloak";
import {Person} from "@/types/person";
import {FirstName} from "@/types/firstName";
import {LastName} from "@/types/lastName";
import {PostPerson} from "@/types/postPerson";

export class PersonService {
    public static async getAllPersons(): Promise<Person[]> {
        await initKeycloak();
        if (keycloak.isTokenExpired()) {
            await keycloak.login();
        }
        const response = await fetch(ENDPOINTS.PERSONS, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return await response.json();
    }

    public static async getPersonById(id: number): Promise<Person> {
        await initKeycloak();
        if (keycloak.isTokenExpired()) {
            await keycloak.login();
        }
        const response = await fetch(`${ENDPOINTS.PERSONS}/${id}`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return await response.json();
    }

    public static async postPerson(person: PostPerson): Promise<Person> {
        if (keycloak.isTokenExpired()) {
            await keycloak.login();
        }
        const response = await fetch(ENDPOINTS.PERSONS, {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
            },
        });
        return await response.json();
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