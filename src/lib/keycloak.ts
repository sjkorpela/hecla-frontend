import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "hecla",
    clientId: "public",
});

let initPromise: Promise<boolean> | null = null;

export function initKeycloak() {
    if (!initPromise) {
        initPromise = keycloak.init({ onLoad: "login-required" }).catch((e) => {
            if (e?.message?.includes("only be initialized once")) {
                return true;
            }
            throw e;
        });
    }
    return initPromise;
}

export default keycloak;