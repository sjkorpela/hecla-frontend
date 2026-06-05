"use client"

import "./modal.css";
import {useEffect, useRef} from "react";
import {useRouter} from "next/navigation";

interface Props {
    children: React.ReactNode,
    headerButtons?: React.ReactNode,
    closeButtonOverride?: () => void
}

export default function Modal(
    { children, headerButtons, closeButtonOverride }: Props
) {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const onCloseButtonClick = closeButtonOverride ?? (() => {router.push("/persons/refresh");})

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    return (
        <dialog ref={dialogRef} className="modal-wrapper">
            <div className="modal-side"/>
            <div className="modal">
                <div className="modal-header">
                    <button className="icon-button" onClick={onCloseButtonClick} >close</button>
                    {headerButtons}
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
            <div className="modal-side"/>
        </dialog>
    );
}