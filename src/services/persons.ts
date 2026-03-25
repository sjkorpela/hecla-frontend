import {ENDPOINTS} from "@/lib";
import keycloak from "@/lib/keycloak";

export class persons {
    public static async getAllPersons() {
        await keycloak.updateToken(30);
        const response = await fetch(ENDPOINTS.PERSONS, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        const persons = await response.json();
        console.log(persons);
        return persons;
    }
}