import Image from "next/image";
import styles from "./page.module.css";
import AllPersonsTable from "@/app/persons/allPersonsTable";
import { redirect } from "next/navigation";

export default function Home() {
    // Auto-redirect
    redirect("/persons");

  // return (
  //   <div className={styles.page}>
  //     <main className={styles.main}>
  //       <div className={styles.intro}>
  //         <h1>HECLA</h1>
  //           <AllPersonsTable />
  //       </div>
  //     </main>
  //   </div>
  // );
}
