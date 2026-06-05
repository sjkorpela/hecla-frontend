import PutForm from "@/app/persons/[id]/put/putForm";
import Modal from "@/components/modal";

export default async function PersonPutPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    return (
        <Modal>
            <PutForm id={id} />
        </Modal>
    )
}