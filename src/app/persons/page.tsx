import AllPersonsTable from "@/app/persons/allPersonsTable";
import "./persons.css";

export default function PersonsPage() {
    return (
        <main className="persons-main">

            <header>
                <h1>HE/CLA</h1>
            </header>

            <AllPersonsTable />
        </main>
    );
}