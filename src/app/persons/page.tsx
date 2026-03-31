import styles from "@/app/page.module.css";
import AllPersonsTable from "@/app/persons/allPersonsTable";

export default function PersonsPage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>SUKULAISET</h1>
                    <AllPersonsTable />

                    <h1>HAKU</h1>
                    <p>tba</p>

                    <h1>SUODATUS</h1>
                    <p>tba</p>

                    <h1>LISÄVAIHTOEHDOT</h1>
                    <p>tba</p>
                </div>
            </main>
        </div>
    );
}