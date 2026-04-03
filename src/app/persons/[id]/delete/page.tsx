import styles from "@/app/page.module.css";
import Link from "next/dist/client/link";
import PutForm from "@/app/persons/[id]/put/putForm";
import DeleteForm from "@/app/persons/[id]/delete/deleteForm";

export default async function PersonDeletePage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <Link href={`/persons/${id}`}><u>{"<"} Takaisin</u></Link>
                    <h1>POISTA SUKULAINEN</h1>
                    <DeleteForm id={id} />
                </div>
            </main>
        </div>
    )
}