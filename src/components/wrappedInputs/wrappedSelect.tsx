import {ChangeEvent} from "react";
import "./wrappedSelect.css"

interface Props {
    children: React.ReactNode,
    onChange?: (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => void,
    value?: any,
}
export default function WrappedSelect({ children, onChange, value }: Props) {
    return (
        <div className="wrapped-select">
            <select onChange={onChange} value={value}>
                {children}
            </select>
        </div>
    )
}