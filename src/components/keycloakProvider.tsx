"use client";
import { useEffect, useState } from "react";
import { initKeycloak } from "@/lib/keycloak";

export default function KeycloakProvider({ children }: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        initKeycloak().then(() => setReady(true));
    }, []);

    if (!ready) {
        return (
            <p>Loading...</p>
        );
    }
    
    return <>{children}</>;
}