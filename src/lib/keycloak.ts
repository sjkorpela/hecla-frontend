import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "hecla",
    clientId: "public",
});

export default keycloak;