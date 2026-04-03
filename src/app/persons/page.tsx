import styles from "@/app/page.module.css";
import AllPersonsTable from "@/app/persons/allPersonsTable";
import Link from "next/dist/client/link";

export default function PersonsPage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>HE/CLA</h1>
                    <h2>SUKULAISET</h2>
                    <AllPersonsTable />

                    <h2>LISÄVAIHTOEHDOT</h2>
                    <ul>
                        <li><Link href={"/persons/post"}><u>Lisää sukulainen</u></Link></li>
                    </ul>
                </div>
            </main>
        </div>
    );
}