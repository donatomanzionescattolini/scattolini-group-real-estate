import ProjectTemplate from "../ProjectTemplate.tsx";
import buildSeventyTwoPark from "../../../objects/desarrollos/MiamiBeach/SeventyTwoPark.tsx";
import {useTranslation} from "../../../i18n.tsx";

export default function SeventyTwoParkProject() {
    const {lang} = useTranslation();
    return (
        <ProjectTemplate

            desarrollo={buildSeventyTwoPark(lang)}
        />
    );
}

