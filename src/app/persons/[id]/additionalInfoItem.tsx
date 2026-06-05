import {AdditionalInfo} from "@/types/additionalInfo";

interface Props {
    info: AdditionalInfo
}

export default function AdditionalInfoItem({ info }: Props) {


    return (
        <div className="additional-info-item">{info.key ?? "N/A"}: {info.value ?? "N/A"}</div>
    )
}