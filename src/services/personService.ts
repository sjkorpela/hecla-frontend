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

    public static getPersonsNickname(firstNames: FirstName[]): string | null {
        if (firstNames == null) {
            return null;
        }
        firstNames.forEach(fn => {
            if (fn.nickname) {
                return fn.name;
            }
        })
        return null;
    }

    public static getPersonsCurrentLastName(lastNames: LastName[]): string | null {
        if (lastNames == null) {
            return null;
        }
        lastNames.forEach(ln => {
            if (ln.current) {
                return ln.name;
            }
        })
        return null;
    }

    public static getPersonsFirstAndLastName(person: Person | null): string | null {
        if (person == null) {
            return null;
        }
        let personName = PersonService.getPersonsNickname(person.firstNames) ?? person.firstNames[0]?.name ?? "N/A"
        personName += " "
        personName += PersonService.getPersonsCurrentLastName(person.lastNames) ?? person.lastNames[0]?.name ?? "N/A"
        return personName;
    }
}