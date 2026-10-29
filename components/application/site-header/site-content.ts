import { HegnarAnonseLogo, HegnarBokLogo, HegnarVideoproduksjonLogo, InteriorMagasinetLogo, KapitalLargeLogo, MotorLogo } from "fa-icons";
import type { SiteBrand, SiteNavItem } from "./site-brands";
import type { SiteMenuContent } from "./site-menu-panel";

/**
 * What `SiteHeader` and `SiteFooter` show when a page passes no `navigation`, `shortcuts`, `menu`
 * or footer content: the publication's real navigation, as finansavisen.no had it in October 2026
 * and as Storybook renders it. These defaults are on purpose: a page that renders
 * `<SiteHeader brand="fa" />` gets the complete header, so prototypes never ship a half-empty
 * Meny panel or a dead Meny button. Pass your own props when the app has CMS-driven navigation.
 *
 * Kapital and Motor reuse the Finansavisen content until their navigation is designed
 * (docs/figma-parity.md §2). Social links and hrefs are the publication's public addresses as far
 * as known; verify them before launch.
 */
export interface SiteContent {
    /** Desktop navigation: link groups split by dividers. */
    navigation: SiteNavItem[][];
    /** The shorter link row on mobile and tablet. */
    shortcuts: SiteNavItem[];
    /** The Meny panel. */
    menu: SiteMenuContent;
    footer: {
        links: SiteNavItem[][];
        publisherInfo: string[];
        copyright: string;
        disclaimer: string;
        socialLinks: { platform: "x" | "facebook" | "instagram" | "tiktok" | "linkedin"; href: string }[];
    };
}

const lists: SiteNavItem[] = [
    { label: "Norges 400 rikeste", href: "/kapital-index/norges-400-rikeste" },
    { label: "Norges rikeste arvinger", href: "/kapital-index/norges-rikeste-arvinger" },
    { label: "Norges 100 mektigste kvinner", href: "/kapital-index/norges-100-mektigste-kvinner" },
    { label: "Norges 500 største bedrifter", href: "/norges-500-storste-bedrifter" },
    { label: "40 under 40", href: "/kapital-index/40-under-40" },
];

const video: SiteNavItem[] = [
    { label: "Fa Direkte", href: "/tv/fa-direkte" },
    { label: "Børsmorgen", href: "/tv/borsmorgen" },
    { label: "Økonominyhetene", href: "/tv/okonominyhetene" },
    { label: "Gjesteintervjuer", href: "/tv/gjesteintervjuer" },
    { label: "Teknisk analyse", href: "/tv/tekniskanalyse" },
    { label: "Motor", href: "/tv/motor" },
    { label: "Kvartalspresentasjoner", href: "/tv/kvartalspresentasjoner" },
];

const fa: SiteContent = {
    navigation: [
        [
            { label: "Siste nytt", href: "/siste" },
            { label: "MittFa", href: "/mittfa" },
        ],
        [
            { label: "Forum", href: "/forum" },
            {
                label: "Børs",
                href: "/bors",
                items: [
                    { label: "Børsoversikt", href: "/bors" },
                    { label: "Råvarer", href: "/raavarer" },
                    { label: "Krypto", href: "/krypto" },
                    { label: "Renter", href: "/renter" },
                    { label: "Indekser", href: "/indekser" },
                    { label: "Fond", href: "/fond" },
                    { label: "Kalender", href: "/kalender" },
                    { label: "Screener", href: "/screener" },
                    { label: "Blokkhandler", href: "/blokkhandler" },
                    { label: "Avstemninger", href: "/avstemninger" },
                    { label: "Innsideporteføljen", href: "/innsideportefoljen" },
                    { label: "Kapitalporteføljen", href: "/kapital-portefoljen" },
                    { label: "Bjellesauporteføljen", href: "/bjellesauportefoljen" },
                    { label: "Rapporter", href: "/rapporter" },
                    { label: "Aksjonærer", href: "/aksjonaerregister" },
                ],
            },
            { label: "Investorchat", href: "/investorchat" },
            { label: "Watchlist", href: "/watchlist" },
            { label: "Bjellesauer", href: "/bjellesauer" },
            { label: "Aksjer", href: "/aksjer" },
            { label: "Valuta", href: "/valuta" },
        ],
        [
            { label: "400 Rikeste", href: "/kapital-index/norges-400-rikeste", items: lists },
            { label: "Video", href: "/tv", items: video },
        ],
    ],
    shortcuts: [
        { label: "Siste", href: "/siste" },
        { label: "Børs", href: "/bors" },
        { label: "Forum", href: "/forum" },
        { label: "Bjellesauer", href: "/bjellesauer" },
        { label: "Watchlist", href: "/watchlist" },
        { label: "Chat", href: "/chat" },
    ],
    menu: {
        groups: [
            {
                label: "Kategorier",
                items: [
                    { label: "Bolig", href: "/bolig" },
                    { label: "Bygg og anlegg", href: "/bygg-og-anlegg" },
                    { label: "Energi", href: "/energi" },
                    { label: "ESG", href: "/esg" },
                    { label: "Finans", href: "/finans" },
                    { label: "Forbruksvarer", href: "/forbruksvarer" },
                    { label: "Forsyning", href: "/forsyning" },
                    { label: "Handel", href: "/handel" },
                    { label: "Helse", href: "/helse" },
                    { label: "Industri", href: "/industri" },
                    { label: "Jus", href: "/jus" },
                    { label: "Karriere", href: "/karriere" },
                    { label: "Kunst", href: "/kunst" },
                    { label: "Makro", href: "/makro" },
                    { label: "Mat og drikke", href: "/mat-og-drikke" },
                    { label: "Medier", href: "/medier" },
                    { label: "Motor", href: "/motor" },
                    { label: "Næringseiendom", href: "/naeringseiendom" },
                    { label: "Personlig økonomi", href: "/personlig-okonomi" },
                    { label: "Politikk", href: "/politikk" },
                    { label: "Reise og fritid", href: "/reise-og-fritid" },
                    { label: "Revisjon og rådgivning", href: "/revisjon-og-radgivning" },
                    { label: "Råvarer", href: "/ravarer" },
                    { label: "Samfunn", href: "/samfunn" },
                    { label: "Shipping", href: "/shipping" },
                    { label: "Sjømat", href: "/sjomat" },
                    { label: "Skatt", href: "/skatt" },
                    { label: "Teknologi", href: "/teknologi" },
                    { label: "Tele", href: "/tele" },
                    { label: "Tjenester", href: "/tjenester" },
                    { label: "Transport", href: "/transport" },
                    { label: "Valuta", href: "/valuta" },
                ],
            },
            { label: "Lister", items: lists, layout: "list" },
        ],
        links: [
            { label: "Feature", href: "/feature" },
            { label: "Meninger", href: "/meninger" },
        ],
        publications: [
            // The Kapital logo keeps its brand orange; a primitive, like the brand surfaces in site-brands.ts.
            { label: "Kapital", href: "/kapital", logo: KapitalLargeLogo, logoClassName: "text-orange-dark-600" },
            { label: "Motor", href: "/motor", logo: MotorLogo, logoClassName: "text-primary" },
        ],
        partners: [
            { label: "Hegnar Bok", href: "https://hegnarbok.no/", logo: HegnarBokLogo },
            { label: "Hegnar Media Videoproduksjon", href: "https://www.videoproduksjon.hegnar.no/", logo: HegnarVideoproduksjonLogo },
            { label: "Hegnar Media Annonse", href: "https://annonseweb.hegnarmedia.no/nb", logo: HegnarAnonseLogo },
            { label: "Interiør Magasinet", href: "https://www.interiormagasinet.no/", logo: InteriorMagasinetLogo },
        ],
        columns: [
            { title: "Video", href: "/tv", items: video },
            {
                title: "Podcast",
                href: "/podcast",
                items: [
                    { label: "Økonominyhetene", href: "/podcast/okonominyhetene" },
                    { label: "Mil etter mil", href: "/podcast/mil-etter-mil" },
                    { label: "Morgenkaffen", href: "/podcast/morgenkaffen" },
                    { label: "Aksjepodden", href: "/podcast/aksjepodden" },
                    { label: "Makro", href: "/podcast/makro" },
                    { label: "Vinkjelleren", href: "/podcast/vinkjelleren" },
                    { label: "Kunstpraten", href: "/podcast/kunstpraten" },
                    { label: "FinansForum", href: "/podcast/finansforum" },
                ],
            },
            {
                title: "Academy",
                href: "/fa-academy",
                items: [
                    { label: "Innovasjonsskolen", href: "/academy/innovasjonsskolen" },
                    { label: "Aksjeskolen", href: "/academy/aksjeskolen" },
                    { label: "Kryptoskolen", href: "/academy/kryptoskolen" },
                    { label: "Merkevareskolen", href: "/academy/merkevareskolen" },
                    { label: "Golfskolen", href: "/academy/golfskolen" },
                    { label: "Vinskolen", href: "/academy/vinskolen" },
                    { label: "Langrennsskolen", href: "/academy/langrennsskolen" },
                    { label: "Økonomi for ikke-økonomer", href: "/academy/ikke-okonomer" },
                    { label: "HR-akademiet", href: "/academy/hrakademiet" },
                ],
            },
        ],
        highlights: [
            { label: "Tips oss", href: "mailto:tips@finansavisen.no" },
            { label: "Kontakt oss", href: "/kontakt-oss" },
            { label: "Last ned app", href: "/app" },
        ],
        eAvis: { weekday: "Fredag", date: "23.10.2026", href: "/eavis" },
    },
    footer: {
        links: [
            [
                { label: "eAvis", href: "/eavis" },
                { label: "Annonse", href: "/annonse" },
                { label: "Arkiv", href: "/arkiv" },
                { label: "Event", href: "/event" },
                { label: "Bedriftsabonnement", href: "/bedrift" },
            ],
            [
                { label: "Personvernerklæring", href: "/personvern" },
                { label: "Vilkår", href: "/vilkar" },
                { label: "Cookies", href: "/cookies" },
                { label: "Samtykkeinnstillinger", href: "/samtykke" },
            ],
        ],
        publisherInfo: ["Utgis av Hegnar Media AS", "Hoffsveien 70 A, PO Box 724 Skøyen, 0214 Oslo", "Sjefredaktør/adm.dir: Trygve Hegnar"],
        copyright: `©${new Date().getFullYear()} Hegnar Media AS`,
        disclaimer:
            "Børsdata levert av Millistream. Nikkei 225 ©Nikkei Inc. TradingView Lightweight Charts™ og TradingView Advanced Charts™ er levert av TradingView, Inc.",
        socialLinks: [
            { platform: "x", href: "https://x.com/finansavisen" },
            { platform: "facebook", href: "https://www.facebook.com/finansavisen" },
            { platform: "instagram", href: "https://www.instagram.com/finansavisen" },
            { platform: "tiktok", href: "https://www.tiktok.com/@finansavisen" },
            { platform: "linkedin", href: "https://www.linkedin.com/company/finansavisen" },
        ],
    },
};

/** The default header and footer content per publication (see the note at the top). */
export const siteContent: Record<SiteBrand, SiteContent> = { fa, kapital: fa, motor: fa };
