"use client";
import { useEffect } from "react";
import keycloak from "@/lib/keycloak";

export default function KeycloakProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        keycloak.init({ onLoad: "login-required" });
    }, []);

    return <>{children}</>;
}