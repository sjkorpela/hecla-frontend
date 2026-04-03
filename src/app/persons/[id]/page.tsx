import AllPersonsTableItem from "@/app/persons/allPersonsTableItem";
import styles from "@/app/page.module.css";
import {PersonService} from "@/services/personService";
import PersonInfo from "@/app/persons/[id]/personInfo";
import Link from "next/dist/client/link";

export default async function PersonPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <Link href={"/persons"}><u>{"<"} Takaisin</u></Link>
                    <PersonInfo id={id} />
                </div>
            </main>
        </div>
    )
}