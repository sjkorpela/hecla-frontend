import {AdditionalInfo} from "@/types/additionalInfo";

interface Props {
    info: AdditionalInfo
}

export default function AdditionalInfoItem({ info }: Props) {


    return (
        <li>{info.key ?? "N/A"}: {info.value ?? "N/A"}</li>
    )
}