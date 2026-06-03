import ProjectTemplate from "../ProjectTemplate.tsx";
import buildElla from "../../../objects/desarrollos/MiamiBeach/Ella.tsx";
import {useTranslation} from "../../../i18n.tsx";

export default function EllaProject() {
    const {lang} = useTranslation();
    return (<ProjectTemplate desarrollo={buildElla(lang)}/>);

}
