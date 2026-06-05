import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {AdditionalInfo} from "@/types/additionalInfo";
import "./formAdditionalInfoPool.css"

interface Props {
    infos: AdditionalInfo[]
    setInfos: Dispatch<SetStateAction<AdditionalInfo[]>>
}
export default function FormAdditionalInfoPool({ infos, setInfos }: Props) {

    function addInfo() {
        setInfos([...infos, {key: "", value: ""}])
    }

    function updateInfoKey(e:  ChangeEvent<HTMLInputElement, HTMLInputElement>, index: number) {
        setInfos(infos.map((info, i) => {
            if (i == index) {
                return {
                    key: e.target.value,
                    value: info.value
                }
            }
            return info;
        }));
    }

    function updateInfoValue(e:  ChangeEvent<HTMLInputElement, HTMLInputElement>, index: number) {
        setInfos(infos.map((info, i) => {
            if (i == index) {
                return {
                    key: info.key,
                    value: e.target.value
                }
            }
            return info;
        }));
    }

    function deleteInfo(index: number) {
        setInfos(infos.filter((_, i) => i !== index));
    }

    return (
        <div className="additional-info-pool">
            {
                infos.map((info, key) => {
                    return (
                        <div className="info-item" key={key}>
                            <input
                                className="info-key"
                                type={"text"}
                                defaultValue={info.key}
                                placeholder={"Nimike"}
                                onChange={(e) => updateInfoKey(e, key)}
                            />
                            <input
                                className="info-value"
                                type={"text"}
                                defaultValue={info.value}
                                placeholder={"Lisätieto"}
                                onChange={(e) => updateInfoValue(e, key)}
                            />
                            <button className="info-delete" type={"button"} onClick={() => deleteInfo(key)}>close</button>
                        </div>
                    )
                })
            }
            <button type={"button"} onClick={addInfo}>Lisää lisätieto</button>
        </div>
    )
}