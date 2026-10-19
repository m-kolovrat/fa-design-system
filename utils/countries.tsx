"use client";

import type { SVGProps } from "react";
import type { SelectItemType } from "@/components/base/select/select";
import { Flag, type FlagName } from "@/components/foundations/flags";

interface Country {
    name: string;
    /** ISO 3166-1 alpha-2 code. */
    code: string;
    flag: FlagName;
    phoneCode: string;
    phoneMask?: string;
}

/**
 * Countries that have a flag in Figma (Fa Design System → Flag), with their country code, flag, phone code, and phone mask.
 */
export const countries: Country[] = [
    {
        name: "Argentina",
        code: "AR",
        flag: "argentina-ars",
        phoneCode: "54",
        phoneMask: "+54 (###) ###-####",
    },
    {
        name: "Australia",
        code: "AU",
        flag: "australia-aud",
        phoneCode: "61",
        phoneMask: "+61-#-####-####",
    },
    {
        name: "Bahrain",
        code: "BH",
        flag: "bahrain-bhd",
        phoneCode: "973",
        phoneMask: "+973-####-####",
    },
    {
        name: "Bangladesh",
        code: "BD",
        flag: "bangladesh-bdt",
        phoneCode: "880",
        phoneMask: "+880-##-###-###",
    },
    {
        name: "Belarus",
        code: "BY",
        flag: "belarus-byn",
        phoneCode: "375",
        phoneMask: "+375 (##) ###-##-##",
    },
    {
        name: "Brazil",
        code: "BR",
        flag: "brazil-brl",
        phoneCode: "55",
        phoneMask: "+55 (##) 9####-####",
    },
    {
        name: "Bulgaria",
        code: "BG",
        flag: "bulgaria-bgn",
        phoneCode: "359",
        phoneMask: "+359 (###) ###-###",
    },
    {
        name: "Canada",
        code: "CA",
        flag: "canada-cad",
        phoneCode: "1",
        phoneMask: "+1 (###) ###-####",
    },
    {
        name: "Chile",
        code: "CL",
        flag: "chile-clp",
        phoneCode: "56",
        phoneMask: "+56-#-####-####",
    },
    {
        name: "China",
        code: "CN",
        flag: "china-cny",
        phoneCode: "86",
        phoneMask: "+86-##-#####-#####",
    },
    {
        name: "Colombia",
        code: "CO",
        flag: "colombia-cop",
        phoneCode: "57",
        phoneMask: "+57 (###) ###-####",
    },
    {
        name: "Denmark",
        code: "DK",
        flag: "denmark-dkk",
        phoneCode: "45",
        phoneMask: "+45-##-##-##-##",
    },
    {
        name: "Dominican Republic",
        code: "DO",
        flag: "dominican-republic-dop",
        phoneCode: "+1-809 and 1-829",
        phoneMask: "+1 (849) ###-####",
    },
    {
        name: "Egypt",
        code: "EG",
        flag: "egypt-egp",
        phoneCode: "20",
        phoneMask: "+20 (###) ###-####",
    },
    {
        name: "Finland",
        code: "FI",
        flag: "finland-eur",
        phoneCode: "358",
        phoneMask: "+358 (###) ###-##-##",
    },
    {
        name: "France",
        code: "FR",
        flag: "france-eur",
        phoneCode: "33",
        phoneMask: "+590 (###) ###-###",
    },
    {
        name: "Germany",
        code: "DE",
        flag: "germany-eur",
        phoneCode: "49",
        phoneMask: "+49-###-###",
    },
    {
        name: "Iceland",
        code: "IS",
        flag: "iceland-isk",
        phoneCode: "354",
        phoneMask: "+354-###-####",
    },
    {
        name: "India",
        code: "IN",
        flag: "india-inr",
        phoneCode: "91",
        phoneMask: "+91 (####) ###-###",
    },
    {
        name: "Indonesia",
        code: "ID",
        flag: "indonesia-idr",
        phoneCode: "62",
        phoneMask: "+62 (8##) ###-##-###",
    },
    {
        name: "Israel",
        code: "IL",
        flag: "israel-ils",
        phoneCode: "972",
        phoneMask: "+972-#-###-####",
    },
    {
        name: "Italy",
        code: "IT",
        flag: "italy-eur",
        phoneCode: "39",
        phoneMask: "+39 (###) ####-###",
    },
    {
        name: "Japan",
        code: "JP",
        flag: "japan-jpy",
        phoneCode: "81",
        phoneMask: "+81 (###) ###-###",
    },
    {
        name: "Jordan",
        code: "JO",
        flag: "jordan-jod",
        phoneCode: "962",
        phoneMask: "+962-#-####-####",
    },
    {
        name: "Kazakhstan",
        code: "KZ",
        flag: "kazakhstan-kzt",
        phoneCode: "7",
        phoneMask: "+7 (7##) ###-##-##",
    },
    {
        name: "Kenya",
        code: "KE",
        flag: "kenya-kes",
        phoneCode: "254",
        phoneMask: "+254-###-######",
    },
    {
        name: "Kuwait",
        code: "KW",
        flag: "kuwait-kwd",
        phoneCode: "965",
        phoneMask: "+965-####-####",
    },
    {
        name: "Malaysia",
        code: "MY",
        flag: "malaysia-myr",
        phoneCode: "60",
        phoneMask: "+60-#-###-###",
    },
    {
        name: "Mauritius",
        code: "MU",
        flag: "mauritius-mur",
        phoneCode: "230",
        phoneMask: "+230-###-####",
    },
    {
        name: "Mexico",
        code: "MX",
        flag: "mexico-mxn",
        phoneCode: "52",
        phoneMask: "+52-##-##-####",
    },
    {
        name: "Morocco",
        code: "MA",
        flag: "morocco-mad",
        phoneCode: "212",
        phoneMask: "+212-##-####-###",
    },
    {
        name: "New Zealand",
        code: "NZ",
        flag: "new-zealand-nzd",
        phoneCode: "64",
        phoneMask: "+64 (###) ###-####",
    },
    {
        name: "North Macedonia",
        code: "MK",
        flag: "north-macedonia-mkd",
        phoneCode: "389",
        phoneMask: "+389-##-###-###",
    },
    {
        name: "Norway",
        code: "NO",
        flag: "norway-nok",
        phoneCode: "47",
        phoneMask: "+47 (###) ##-###",
    },
    {
        name: "Oman",
        code: "OM",
        flag: "oman-omr",
        phoneCode: "968",
        phoneMask: "+968-##-###-###",
    },
    {
        name: "Peru",
        code: "PE",
        flag: "peru-pen",
        phoneCode: "51",
        phoneMask: "+51 (###) ###-###",
    },
    {
        name: "Philippines",
        code: "PH",
        flag: "philippines-php",
        phoneCode: "63",
        phoneMask: "+63 (###) ###-####",
    },
    {
        name: "Poland",
        code: "PL",
        flag: "poland-pln",
        phoneCode: "48",
        phoneMask: "+48 (###) ###-###",
    },
    {
        name: "Qatar",
        code: "QA",
        flag: "qatar-qar",
        phoneCode: "974",
        phoneMask: "+974-####-####",
    },
    {
        name: "Russia",
        code: "RU",
        flag: "russia-rub",
        phoneCode: "7",
        phoneMask: "+7 (###) ###-##-##",
    },
    {
        name: "Saudi Arabia",
        code: "SA",
        flag: "saudi-arabia-sar",
        phoneCode: "966",
        phoneMask: "+966-#-###-####",
    },
    {
        name: "Serbia",
        code: "RS",
        flag: "serbia-rsd",
        phoneCode: "381",
        phoneMask: "+381-##-###-####",
    },
    {
        name: "Singapore",
        code: "SG",
        flag: "singapore-sgd",
        phoneCode: "65",
        phoneMask: "+65-####-####",
    },
    {
        name: "South Africa",
        code: "ZA",
        flag: "south-africa-zar",
        phoneCode: "27",
        phoneMask: "+27-##-###-####",
    },
    {
        name: "Spain",
        code: "ES",
        flag: "spain-eur",
        phoneCode: "34",
        phoneMask: "+34 (###) ###-###",
    },
    {
        name: "Sweden",
        code: "SE",
        flag: "sweden-sek",
        phoneCode: "46",
        phoneMask: "+46-##-###-####",
    },
    {
        name: "Switzerland",
        code: "CH",
        flag: "switzerland-chf",
        phoneCode: "41",
        phoneMask: "+41-##-###-####",
    },
    {
        name: "Tanzania",
        code: "TZ",
        flag: "tanzania-tzs",
        phoneCode: "255",
        phoneMask: "+255-##-###-####",
    },
    {
        name: "Tunisia",
        code: "TN",
        flag: "tunisia-tnd",
        phoneCode: "216",
        phoneMask: "+216-##-###-###",
    },
    {
        name: "Turkey",
        code: "TR",
        flag: "turkey-try",
        phoneCode: "90",
        phoneMask: "+90 (###) ###-####",
    },
    {
        name: "Ukraine",
        code: "UA",
        flag: "ukraine-uah",
        phoneCode: "380",
        phoneMask: "+380 (##) ###-##-##",
    },
    {
        name: "United Kingdom",
        code: "GB",
        flag: "united-kingdom-gbp",
        phoneCode: "44",
    },
    {
        name: "United States",
        code: "US",
        flag: "united-states-usd",
        phoneCode: "1",
        phoneMask: "+1 (###) ###-####",
    },
    {
        name: "Uruguay",
        code: "UY",
        flag: "uruguay-uyu",
        phoneCode: "598",
        phoneMask: "+598-#-###-##-##",
    },
    {
        name: "Vietnam",
        code: "VN",
        flag: "vietnam-vnd",
        phoneCode: "84",
        phoneMask: "+84 (###) ####-###",
    },
];

/**
 * Phone code options for the select component.
 */
export const phoneCodeOptions: SelectItemType[] = countries.map((country) => ({
    id: country.code,
    label: country.code,
}));

/**
 * Country options for the select component.
 */
export const countriesOptions: SelectItemType[] = countries.map((country) => ({
    id: country.code,
    label: country.name,
    icon: (props: SVGProps<SVGSVGElement>) => <Flag {...props} name={country.flag} />,
}));

export default countries;
