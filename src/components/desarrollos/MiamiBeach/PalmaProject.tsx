import ProjectTemplate from "../ProjectTemplate.tsx";
import buildPalma from "../../../objects/desarrollos/MiamiBeach/Palma.tsx";
import {useTranslation} from "../../../i18n.tsx";

export default function PalmaProject() {
    const {lang} = useTranslation();
    return <ProjectTemplate desarrollo={buildPalma(lang)}/>


}
