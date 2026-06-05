import AllPersonsTableItem from "@/app/persons/allPersonsTableItem";
import styles from "@/app/page.module.css";
import {PersonService} from "@/services/personService";
import PersonInfo from "@/app/persons/[id]/personInfo";
import Link from "next/dist/client/link";
import Modal from "@/components/modal";
import DeleteForm from "@/app/persons/[id]/delete/deleteForm";

export default async function PersonPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    return (
        <Modal>
            <DeleteForm id={id}/>
        </Modal>
    )
}