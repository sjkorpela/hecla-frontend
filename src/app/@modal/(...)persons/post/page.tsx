import Modal from "@/components/modal";
import PostForm from "@/app/persons/post/postForm";


export default function ModalPostPage() {
    return (
        <Modal>
            <h1>UUSI SUKULAINEN</h1>
            <PostForm />
        </Modal>
    )
}