import {ENDPOINTS} from "@/lib";
import keycloak from "@/lib/keycloak";
import {Person} from "@/types/person";

export class persons {
    public static async getAllPersons(): Promise<Person[]> {
        await keycloak.updateToken(30);
        const response = await fetch(ENDPOINTS.PERSONS, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return await response.json();
    }
}