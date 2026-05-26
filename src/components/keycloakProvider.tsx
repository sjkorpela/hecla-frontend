"use client";
import { useEffect } from "react";
import { initKeycloak } from "@/lib/keycloak";

export default function KeycloakProvider({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        initKeycloak();
    }, []);
    
    return <>{children}</>;
}