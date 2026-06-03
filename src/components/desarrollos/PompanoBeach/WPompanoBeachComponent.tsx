import ProjectTemplate from "../ProjectTemplate.tsx";
import buildWPompanoBeach from "../../../objects/desarrollos/PompanoBeach/WPompanoBeach.tsx";
import {useTranslation} from "../../../i18n.tsx";

export default function WPompanoBeachComponent() {
    const {lang} = useTranslation();
    return <ProjectTemplate desarrollo={buildWPompanoBeach(lang)}/>;
}
