import styles from "@/app/page.module.css";
import Link from "next/dist/client/link";
import PersonInfo from "@/app/persons/[id]/personInfo";
import PutForm from "@/app/persons/[id]/put/putForm";

export default async function PersonPutPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <Link href={`/persons/${id}`}><u>{"<"} Takaisin</u></Link>
                    <PutForm id={id} />
                </div>
            </main>
        </div>
    )
}