"use client";

import { HegnarAnonseLogo, HegnarBokLogo, HegnarVideoproduksjonLogo, InteriorMagasinetLogo, KapitalLargeLogo, MotorLogo } from "fa-icons";
import type { SiteBrand, SiteNavItem } from "./site-brands";
import { SiteHeader } from "./site-header";
import type { SiteMenuContent } from "./site-menu-panel";
import type { TickerItem } from "./ticker-bar";

export const tickerItems: TickerItem[] = [
    { label: "Oslo Børs", value: "1.193,30", change: "11,69%", direction: "up", href: "/ticker/OSEBX" },
    { label: "Brent spot", value: "96,09", change: "2,98%", direction: "up", href: "/ticker/Brent%20Spot%3DF" },
    { label: "Dollar", value: "10,51", change: "1,27%", direction: "up", href: "/ticker/USDNOK" },
    { label: "Euro", value: "11,64", change: "0,46%", direction: "up", href: "/ticker/EURNOK" },
    { label: "US 10 ÅR", value: "3,83", change: "-1,59%", direction: "down", href: "/ticker/US10Y" },
    { label: "Bitcoin", value: "60.278", change: "-0,44%", direction: "down", href: "/ticker/BTCNOK" },
    { label: "Gull", value: "2.510,38", change: "-1,84%", direction: "down", href: "/ticker/XAUUSD" },
    { label: "Nikkei 225", value: "38.362,53", change: "-1,84%", direction: "down", href: "/ticker/N225" },
];

export const navigation: SiteNavItem[][] = [
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
        {
            label: "400 Rikeste",
            href: "/kapital-index/norges-400-rikeste",
            items: [
                { label: "Norges 400 rikeste", href: "/kapital-index/norges-400-rikeste" },
                { label: "Norges rikeste arvinger", href: "/kapital-index/norges-rikeste-arvinger" },
                { label: "Norges 100 mektigste kvinner", href: "/kapital-index/norges-100-mektigste-kvinner" },
                { label: "Norges 500 største bedrifter", href: "/norges-500-storste-bedrifter" },
                { label: "40 under 40", href: "/kapital-index/40-under-40" },
            ],
        },
        {
            label: "Video",
            href: "/tv",
            items: [
                { label: "Fa Direkte", href: "/tv/fa-direkte" },
                { label: "Børsmorgen", href: "/tv/borsmorgen" },
                { label: "Økonominyhetene", href: "/tv/okonominyhetene" },
                { label: "Gjesteintervjuer", href: "/tv/gjesteintervjuer" },
                { label: "Teknisk analyse", href: "/tv/tekniskanalyse" },
                { label: "Motor", href: "/tv/motor" },
                { label: "Kvartalspresentasjoner", href: "/tv/kvartalspresentasjoner" },
            ],
        },
    ],
];

const lists: SiteNavItem[] = [
    { label: "Norges 400 rikeste", href: "/kapital-index/norges-400-rikeste" },
    { label: "Norges rikeste arvinger", href: "/kapital-index/norges-rikeste-arvinger" },
    { label: "Norges 100 mektigste kvinner", href: "/kapital-index/norges-100-mektigste-kvinner" },
    { label: "Norges 500 største bedrifter", href: "/norges-500-storste-bedrifter" },
    { label: "40 under 40", href: "/kapital-index/40-under-40" },
];

export const menu: SiteMenuContent = {
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
        {
            title: "Video",
            href: "/tv",
            items: [
                { label: "Fa Direkte", href: "/tv/fa-direkte" },
                { label: "Børsmorgen", href: "/tv/borsmorgen" },
                { label: "Økonominyhetene", href: "/tv/okonominyhetene" },
                { label: "Gjesteintervjuer", href: "/tv/gjesteintervjuer" },
                { label: "Teknisk analyse", href: "/tv/tekniskanalyse" },
                { label: "Motor", href: "/tv/motor" },
                { label: "Kvartalspresentasjoner", href: "/tv/kvartalspresentasjoner" },
            ],
        },
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
};

export const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors" },
    { label: "Forum", href: "/forum" },
    { label: "Bjellesauer", href: "/bjellesauer" },
    { label: "Watchlist", href: "/watchlist" },
    { label: "Chat", href: "/chat" },
];

interface SiteHeaderDemoProps {
    brand?: SiteBrand;
    collapsed?: boolean;
    signedIn?: boolean;
}

export const SiteHeaderDemo = ({ brand = "fa", collapsed, signedIn }: SiteHeaderDemoProps) => (
    <SiteHeader
        brand={brand}
        collapsed={collapsed}
        tickerItems={tickerItems}
        navigation={navigation}
        shortcuts={shortcuts}
        menu={menu}
        user={signedIn ? { initials: "X", href: "/min-side" } : undefined}
    />
);
