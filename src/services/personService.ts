import {ENDPOINTS} from "@/lib";
import keycloak, { initKeycloak } from "@/lib/keycloak";
import {Person} from "@/types/person";
import {FirstName} from "@/types/firstName";
import {LastName} from "@/types/lastName";

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
}