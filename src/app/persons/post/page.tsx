import styles from "@/app/page.module.css";
import AllPersonsTable from "@/app/persons/allPersonsTable";

export default function PersonsPage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>POST NEW PERSON</h1>

                </div>
            </main>
        </div>
    );
}