import Image from "next/image";
import styles from "./page.module.css";
import PersonsList from "@/components/PersonsList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>HECLA</h1>
            <PersonsList />
        </div>
      </main>
    </div>
  );
}
