import AllPersonsTableItem from "@/app/persons/allPersonsTableItem";
import styles from "@/app/page.module.css";
import {PersonService} from "@/services/personService";
import PersonInfo from "@/app/persons/[id]/personInfo";
import Link from "next/dist/client/link";
import Modal from "@/components/modal";

export default async function PersonPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    return (
        <Modal>
            <PersonInfo id={id} />
        </Modal>
    )
}