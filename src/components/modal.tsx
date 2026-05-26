"use client"

import "./modal.css";
import {useEffect, useRef} from "react";

export default function Modal(
    { children }: { children: React.ReactNode }
) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    return (
        <dialog ref={dialogRef} className="modal-wrapper">
            <div className="modal-side"/>
            <div className="modal">
                {children}
            </div>
            <div className="modal-side"/>
        </dialog>
    );
}