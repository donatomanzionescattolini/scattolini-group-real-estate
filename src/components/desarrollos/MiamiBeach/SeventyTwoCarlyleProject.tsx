import ProjectTemplate from "../ProjectTemplate.tsx";
import buildSeventyTwoCarlyle from "../../../objects/desarrollos/MiamiBeach/72Carlyle.tsx";
import {useTranslation} from "../../../i18n.tsx";

export default function SeventyTwoCarlyleProject() {
    const {lang} = useTranslation();
    return <ProjectTemplate desarrollo={buildSeventyTwoCarlyle(lang)}/>;
}
