import ProjectTemplate from "../ProjectTemplate.tsx";
import buildNexo from "../../../objects/desarrollos/MiamiBeach/Nexo.tsx";
import {useTranslation} from "../../../i18n.tsx";

export default function NexoProject() {
    const {lang} = useTranslation();
    return (<ProjectTemplate desarrollo={buildNexo(lang)}/>);
}
