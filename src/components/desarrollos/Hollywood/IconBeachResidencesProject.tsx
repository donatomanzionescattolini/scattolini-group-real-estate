import ProjectTemplate from "../ProjectTemplate.tsx";
import buildIconBeachResidences from "../../../objects/desarrollos/Hollywood/IconBeachResidences.tsx";
import {useTranslation} from "../../../i18n.tsx";

export default function IconBeachResidencesProject() {
    const {lang} = useTranslation();
    return <ProjectTemplate desarrollo={buildIconBeachResidences(lang)}/>;
}

