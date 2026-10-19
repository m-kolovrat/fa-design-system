"use client";

import type { SVGProps } from "react";
import ArgentinaArsFlag from "./argentina-ars";
import AustraliaAudFlag from "./australia-aud";
import BahrainBhdFlag from "./bahrain-bhd";
import BangladeshBdtFlag from "./bangladesh-bdt";
import BelarusBynFlag from "./belarus-byn";
import BrazilBrlFlag from "./brazil-brl";
import BulgariaBgnFlag from "./bulgaria-bgn";
import CanadaCadFlag from "./canada-cad";
import ChileClpFlag from "./chile-clp";
import ChinaCnyFlag from "./china-cny";
import ColombiaCopFlag from "./colombia-cop";
import DenmarkDkkFlag from "./denmark-dkk";
import DominicanRepublicDopFlag from "./dominican-republic-dop";
import EgyptEgpFlag from "./egypt-egp";
import EuropeEurFlag from "./europe-eur";
import FinlandEurFlag from "./finland-eur";
import FranceEurFlag from "./france-eur";
import GermanyEurFlag from "./germany-eur";
import GlobeFlag from "./globe";
import HongKongHkdFlag from "./hong-kong-hkd";
import IcelandIskFlag from "./iceland-isk";
import IndiaInrFlag from "./india-inr";
import IndonesiaIdrFlag from "./indonesia-idr";
import IsraelIlsFlag from "./israel-ils";
import ItalyEurFlag from "./italy-eur";
import JapanJpyFlag from "./japan-jpy";
import JordanJodFlag from "./jordan-jod";
import KazakhstanKztFlag from "./kazakhstan-kzt";
import KenyaKesFlag from "./kenya-kes";
import KuwaitKwdFlag from "./kuwait-kwd";
import MalaysiaMyrFlag from "./malaysia-myr";
import MauritiusMurFlag from "./mauritius-mur";
import MexicoMxnFlag from "./mexico-mxn";
import MoroccoMadFlag from "./morocco-mad";
import NewZealandNzdFlag from "./new-zealand-nzd";
import NorthMacedoniaMkdFlag from "./north-macedonia-mkd";
import NorwayNokFlag from "./norway-nok";
import OmanOmrFlag from "./oman-omr";
import PeruPenFlag from "./peru-pen";
import PhilippinesPhpFlag from "./philippines-php";
import PolandPlnFlag from "./poland-pln";
import QatarQarFlag from "./qatar-qar";
import RussiaRubFlag from "./russia-rub";
import SaudiArabiaSarFlag from "./saudi-arabia-sar";
import SerbiaRsdFlag from "./serbia-rsd";
import SingaporeSgdFlag from "./singapore-sgd";
import SouthAfricaZarFlag from "./south-africa-zar";
import SpainEurFlag from "./spain-eur";
import SwedenSekFlag from "./sweden-sek";
import SwitzerlandChfFlag from "./switzerland-chf";
import TaiwanTwdFlag from "./taiwan-twd";
import TanzaniaTzsFlag from "./tanzania-tzs";
import TunisiaTndFlag from "./tunisia-tnd";
import TurkeyTryFlag from "./turkey-try";
import UkraineUahFlag from "./ukraine-uah";
import UnitedKingdomGbpFlag from "./united-kingdom-gbp";
import UnitedStatesUsdFlag from "./united-states-usd";
import UruguayUyuFlag from "./uruguay-uyu";
import VietnamVndFlag from "./vietnam-vnd";

/**
 * Flags by Figma name: `<country>-<currency>`, plus `globe`. Figma: Fa Design System → Misc icons → Flag.
 */
export const flags = {
    "argentina-ars": ArgentinaArsFlag,
    "australia-aud": AustraliaAudFlag,
    "bahrain-bhd": BahrainBhdFlag,
    "bangladesh-bdt": BangladeshBdtFlag,
    "belarus-byn": BelarusBynFlag,
    "brazil-brl": BrazilBrlFlag,
    "bulgaria-bgn": BulgariaBgnFlag,
    "canada-cad": CanadaCadFlag,
    "chile-clp": ChileClpFlag,
    "china-cny": ChinaCnyFlag,
    "colombia-cop": ColombiaCopFlag,
    "denmark-dkk": DenmarkDkkFlag,
    "dominican-republic-dop": DominicanRepublicDopFlag,
    "egypt-egp": EgyptEgpFlag,
    "europe-eur": EuropeEurFlag,
    "finland-eur": FinlandEurFlag,
    "france-eur": FranceEurFlag,
    "germany-eur": GermanyEurFlag,
    globe: GlobeFlag,
    "hong-kong-hkd": HongKongHkdFlag,
    "iceland-isk": IcelandIskFlag,
    "india-inr": IndiaInrFlag,
    "indonesia-idr": IndonesiaIdrFlag,
    "israel-ils": IsraelIlsFlag,
    "italy-eur": ItalyEurFlag,
    "japan-jpy": JapanJpyFlag,
    "jordan-jod": JordanJodFlag,
    "kazakhstan-kzt": KazakhstanKztFlag,
    "kenya-kes": KenyaKesFlag,
    "kuwait-kwd": KuwaitKwdFlag,
    "malaysia-myr": MalaysiaMyrFlag,
    "mauritius-mur": MauritiusMurFlag,
    "mexico-mxn": MexicoMxnFlag,
    "morocco-mad": MoroccoMadFlag,
    "new-zealand-nzd": NewZealandNzdFlag,
    "north-macedonia-mkd": NorthMacedoniaMkdFlag,
    "norway-nok": NorwayNokFlag,
    "oman-omr": OmanOmrFlag,
    "peru-pen": PeruPenFlag,
    "philippines-php": PhilippinesPhpFlag,
    "poland-pln": PolandPlnFlag,
    "qatar-qar": QatarQarFlag,
    "russia-rub": RussiaRubFlag,
    "saudi-arabia-sar": SaudiArabiaSarFlag,
    "serbia-rsd": SerbiaRsdFlag,
    "singapore-sgd": SingaporeSgdFlag,
    "south-africa-zar": SouthAfricaZarFlag,
    "spain-eur": SpainEurFlag,
    "sweden-sek": SwedenSekFlag,
    "switzerland-chf": SwitzerlandChfFlag,
    "taiwan-twd": TaiwanTwdFlag,
    "tanzania-tzs": TanzaniaTzsFlag,
    "tunisia-tnd": TunisiaTndFlag,
    "turkey-try": TurkeyTryFlag,
    "ukraine-uah": UkraineUahFlag,
    "united-kingdom-gbp": UnitedKingdomGbpFlag,
    "united-states-usd": UnitedStatesUsdFlag,
    "uruguay-uyu": UruguayUyuFlag,
    "vietnam-vnd": VietnamVndFlag,
};

export type FlagName = keyof typeof flags;

export interface FlagProps extends SVGProps<SVGSVGElement> {
    /** Figma flag name, e.g. `"argentina-ars"`: country, then its ISO 4217 currency code. */
    name: FlagName;
}

/** A round 24×24 flag. Decorative by default; pass `aria-hidden={false}` and `aria-label` when it carries meaning on its own. */
export const Flag = ({ name, ...props }: FlagProps) => {
    const Component = flags[name];

    return <Component aria-hidden="true" {...props} />;
};
