import styles from "@/app/page.module.css";
import Link from "next/dist/client/link";
import PutForm from "@/app/persons/[id]/put/putForm";
import DeleteForm from "@/app/persons/[id]/delete/deleteForm";
import Modal from "@/components/modal";

export default async function PersonDeletePage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    return (
        <Modal>
            <DeleteForm id={id} />
        </Modal>
    )
}