import { redirect } from "next/navigation";

export default function Home() {
    // Auto-redirect
    redirect("/persons");
}
