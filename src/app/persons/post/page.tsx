import styles from "@/app/page.module.css";
import PostForm from "@/app/persons/post/postForm";
import Link from "next/dist/client/link";

export default function PersonsPage() {

    return (
        <div>
            <h1>UUSI SUKULAINEN</h1>
            <PostForm />
        </div>
    );
}