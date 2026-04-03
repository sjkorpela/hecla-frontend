import styles from "@/app/page.module.css";
import PostForm from "@/app/persons/post/postForm";
import Link from "next/dist/client/link";

export default function PersonsPage() {

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <Link href={"/persons"}><u>{"<"} Takaisin</u></Link>
                    <h1>UUSI SUKULAINEN</h1>
                    <PostForm />
                </div>
            </main>
        </div>
    );
}