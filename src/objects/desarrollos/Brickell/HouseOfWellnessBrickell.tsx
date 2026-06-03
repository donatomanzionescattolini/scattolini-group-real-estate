import React from "react";
import Desarrollo from "../../../models/desarrollos/Desarrollo";
import Brickell from "../../areas/Brickell.tsx";
import {getDesarrolloI18n} from "../useDesarrolloI18n";

const {getLocalizedField, getLocalizedArray} = getDesarrolloI18n("house-of-wellness-brickell", "es");

const houseOfWellnessBrickell = new Desarrollo(Brickell);

houseOfWellnessBrickell.nombre = "house-of-wellness-brickell";
houseOfWellnessBrickell.titulo = getLocalizedField("titulo", "House of Wellness Brickell");
houseOfWellnessBrickell.slogan = getLocalizedField("slogan", "Life at the Center. Wellness at the Core.");
houseOfWellnessBrickell.direccion = getLocalizedField("direccion", "152 SW 9th Street, Miami, Florida 33130");
houseOfWellnessBrickell.ubicacion = houseOfWellnessBrickell.direccion;
houseOfWellnessBrickell.introduccion = getLocalizedArray("introduccion", [
    "House of Wellness Brickell is a wellness-focused residential tower in the heart of Brickell, Miami.",
]);
houseOfWellnessBrickell.estimatedCompletionYear = Number.parseInt(getLocalizedField("estimatedCompletionYear", "2028"), 10) || 2028;
houseOfWellnessBrickell.numberOfFloors = Number.parseInt(getLocalizedField("numberOfFloors", "34"), 10) || 34;
houseOfWellnessBrickell.numberOfUnits = Number.parseInt(getLocalizedField("numberOfUnits", "656"), 10) || 656;
houseOfWellnessBrickell.typeOfUnits = getLocalizedField("typeOfUnits", "Studios, 1 & 2 Bedrooms");
houseOfWellnessBrickell.numberOfImages = 18;
houseOfWellnessBrickell.video = "https://pagina-mama.s3.amazonaws.com/assets2/desarrollos/house-of-wellness-brickell/video.mp4";
houseOfWellnessBrickell.banner = getLocalizedField("banner", "true") === "true";

houseOfWellnessBrickell.caracteristicas = {
    edificio: (
        <dl>
            <dt>{getLocalizedField("caracteristicas.edificio.direccion", "Dirección")}</dt>
            <dd>{houseOfWellnessBrickell.direccion}</dd>
            <dt>{getLocalizedField("caracteristicas.edificio.pisos", "Pisos")}</dt>
            <dd>{houseOfWellnessBrickell.numberOfFloors}</dd>
            <dt>{getLocalizedField("caracteristicas.edificio.unidades", "Unidades")}</dt>
            <dd>{houseOfWellnessBrickell.numberOfUnits}</dd>
            <dt>{getLocalizedField("caracteristicas.edificio.tipos", "Tipos de residencias")}</dt>
            <dd>{houseOfWellnessBrickell.typeOfUnits as string}</dd>
            <dt>{getLocalizedField("caracteristicas.edificio.amenidades", "Amenidades wellness")}</dt>
            <dd>{getLocalizedField("caracteristicas.edificio.amenidadesValor", "22,000+ sq ft")}</dd>
            <dt>{getLocalizedField("caracteristicas.edificio.desarrollador", "Desarrollador")}</dt>
            <dd>{getLocalizedField("caracteristicas.edificio.desarrolladorValor", "North Development")}</dd>
        </dl>
    ),
    residencias: (
        <ul>
            <li>{getLocalizedField("caracteristicas.residencias.r1", "Studios, one-bedroom, and two-bedroom residences")}</li>
            <li>{getLocalizedField("caracteristicas.residencias.r2", "Approx. 9'4\" ceiling heights")}</li>
            <li>{getLocalizedField("caracteristicas.residencias.r3", "Premium appliance package including cooktop, fridge, dishwasher, and speed oven")}</li>
            <li>{getLocalizedField("caracteristicas.residencias.r4", "Finished flooring throughout and porcelain-tiled bathrooms")}</li>
            <li>{getLocalizedField("caracteristicas.residencias.r5", "Two-tone cabinets with terrazzo countertops and polished concrete balconies")}</li>
        </ul>
    ),
    amenidades: (
        <ul>
            <li>{getLocalizedField("caracteristicas.amenidades.a1", "Comprehensive 360° health and wellness assessment at move-in")}</li>
            <li>{getLocalizedField("caracteristicas.amenidades.a2", "Personalized wellness plans with services such as nutrition, personal training, physical therapy, massage, esthetician support, and IV therapy")}</li>
            <li>{getLocalizedField("caracteristicas.amenidades.a3", "Courtyard pool, coworking space, indoor-outdoor fitness studio, and spa sanctuary with sauna and steam")}</li>
            <li>{getLocalizedField("caracteristicas.amenidades.a4", "Wellness bar, outdoor social lounges, and community classes")}</li>
            <li>{getLocalizedField("caracteristicas.amenidades.a5", "Prime Brickell location near Brickell City Centre, Metrorail, Metromover, and The Underline")}</li>
        </ul>
    ),
};


export default houseOfWellnessBrickell;

