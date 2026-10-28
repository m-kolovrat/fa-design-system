"use client";

import { type ReactNode, useState } from "react";
import { Chat, Info, Link as LinkIcon, Lock, Mail, Share, Star, StarFilled } from "fa-icons";
import type { Key } from "react-aria";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import { footerLinks } from "@/components/application/site-footer/site-footer.demo";
import { SiteHeader } from "@/components/application/site-header/site-header";
import { menu, navigation, shortcuts, tickerItems } from "@/components/application/site-header/site-header.demo";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { SocialButton } from "@/components/base/buttons/social-button";
import { cx } from "@/utils/cx";

/* ---------------------------------------------------------------- data (placeholders) */

type Period = "1d" | "1w" | "1m" | "ytd" | "1y" | "5y";

const periodLabels: Record<Period, string> = { "1d": "1D", "1w": "1U", "1m": "1M", ytd: "I år", "1y": "1Å", "5y": "5Å" };

interface Stock {
    name: string;
    ticker: string;
    price: number;
    currency: string;
    dayChange: number;
    returns: Record<Period, number>;
}

const stocks: Stock[] = [
    {
        name: "Bruton",
        ticker: "BRUT",
        price: 57,
        currency: "NOK",
        dayChange: -1.04,
        returns: { "1d": -1.04, "1w": 2.31, "1m": -4.8, ytd: 18.6, "1y": 22.4, "5y": 310.5 },
    },
    {
        name: "International Seaways",
        ticker: "INSW.US",
        price: 113.7,
        currency: "USD",
        dayChange: 2.64,
        returns: { "1d": 2.64, "1w": 5.12, "1m": 9.4, ytd: 31.2, "1y": 27.9, "5y": 402.3 },
    },
];

const investor = {
    name: "Andreas Wold Hofstad",
    age: 31,
    holdings: "22,06 M NOK",
    count: 6,
    largest: "LUMI",
    bought: "41,39 M NOK",
    sold: "25,31 M NOK",
};

const comments = [
    { name: "Kari Nordhaug", time: "12:04", text: "Interessant at han tar motsatt side av resten av markedet. Tankratene har holdt seg høye lenge." },
    { name: "Ole Martin Berg", time: "12:31", text: "Shorter man tankaksjer i dette markedet må man ha godt med tålmodighet." },
    { name: "Silje Hauge", time: "13:15", text: "Hvor stor er egentlig posisjonen sammenlignet med resten av porteføljen?" },
];

const furtherReading = [
    { meta: "Shipping · I går", title: "Tankrederiene kjøper tilbake aksjer for rekordsummer", href: "#" },
    { meta: "Børs · 09:12", title: "Bruton-sjefen: – Vi ser ingen svekkelse i etterspørselen", href: "#" },
    { meta: "Pluss · 25. okt.", title: "Her er investorene som tjener mest på råoljetankene", href: "#" },
];

/* ---------------------------------------------------------------- helpers */

const pct = new Intl.NumberFormat("nb-NO", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "exceptZero" });
const num = new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Change value stand-in from page-patterns.md. */
const ChangeValue = ({ value, className }: { value: number; className?: string }) => (
    <span className={cx("tabular-nums", value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary", className)}>
        {pct.format(value / 100)}
    </span>
);

const inset = "rounded-2xl bg-tertiary p-4";

/* ---------------------------------------------------------------- pieces */

/** Follow chip stand-in (no Figma component yet). */
const FollowChip = ({ label, avatar }: { label: string; avatar?: string }) => {
    const [following, setFollowing] = useState(false);
    return (
        <Button
            color="secondary"
            size="sm"
            aria-pressed={following}
            iconLeading={avatar ? <Avatar size="xs" initials={avatar} data-icon /> : undefined}
            iconTrailing={following ? StarFilled : Star}
            onPress={() => setFollowing(!following)}
        >
            {label}
        </Button>
    );
};

/** Live price inset with period selector (stand-in, no Figma component yet). */
const StockInset = ({ stock }: { stock: Stock }) => {
    const [period, setPeriod] = useState<Set<Key>>(new Set(["1d"]));
    const selected = ([...period][0] ?? "1d") as Period;

    return (
        <aside aria-label={`Kurs ${stock.name}`} className={cx(inset, "not-prose my-6 flex flex-col gap-4")}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <a
                        href="#"
                        className="rounded-xs text-sm font-medium text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        {stock.name}
                    </a>
                    <Badge color="brand" size="sm" type="pill-color">
                        {stock.ticker}
                    </Badge>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                    <p className="text-display-xs font-semibold text-primary tabular-nums">
                        {num.format(stock.price)} <span className="text-sm font-medium text-tertiary">{stock.currency}</span>
                    </p>
                    <ChangeValue value={stock.dayChange} className="text-sm font-medium" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <ButtonGroup
                    aria-label={`Avkastningsperiode ${stock.name}`}
                    size="sm"
                    selectedKeys={period}
                    onSelectionChange={setPeriod}
                    disallowEmptySelection
                >
                    {(Object.keys(periodLabels) as Period[]).map((p) => (
                        <ButtonGroupItem key={p} id={p}>
                            {periodLabels[p]}
                        </ButtonGroupItem>
                    ))}
                </ButtonGroup>
                <div className="flex items-center justify-between border-b border-secondary pb-2 text-sm">
                    <span className="font-medium text-tertiary">Avkastning {periodLabels[selected]}</span>
                    <ChangeValue value={stock.returns[selected]} className="font-semibold" />
                </div>
            </div>
        </aside>
    );
};

/** Investor profile inset (key figures, no Figma component yet). */
const InvestorInset = () => {
    const figures: [string, string][] = [
        ["Beholdning", investor.holdings],
        ["Antall aksjer", String(investor.count)],
        ["Største investering", investor.largest],
        ["Kjøpt siste 12 mnd", investor.bought],
        ["Solgt siste 12 mnd", investor.sold],
    ];
    return (
        <aside aria-label="Investorprofil" className={cx(inset, "not-prose my-6 flex flex-col gap-4")}>
            <div className="flex items-center justify-between gap-3">
                <AvatarLabelGroup size="md" initials="AH" alt="" title={investor.name} subtitle={`Investor, ${investor.age} år`} />
                <Button href="#" color="link-color" size="sm">
                    Se profil
                </Button>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                {figures.map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-0.5">
                        <dt className="text-xs font-medium text-tertiary">{label}</dt>
                        <dd className="text-md font-semibold text-primary tabular-nums">{value}</dd>
                    </div>
                ))}
            </dl>
        </aside>
    );
};

/** Paywall box stand-in (no Figma component yet). */
const PaywallBox = () => (
    <section
        aria-labelledby="paywall-title"
        className="mx-auto mt-8 flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-secondary bg-primary_alt p-6 text-center"
    >
        <BadgeWithIcon iconLeading={Lock} color="brand" size="md" type="pill-color">
            Pluss
        </BadgeWithIcon>
        <div className="flex flex-col gap-2">
            <h2 id="paywall-title" className="text-display-xs font-semibold text-primary">
                Bli abonnent fra 99 kr
            </h2>
            <p className="text-sm text-tertiary">Les hele saken og alle andre Pluss-saker. Ingen bindingstid.</p>
        </div>
        <div className="flex w-full flex-col gap-3">
            <Button size="lg" className="w-full" href="#">
                Se abonnementer
            </Button>
            <SocialButton social="google" theme="gray" className="w-full">
                Fortsett med Google
            </SocialButton>
            <SocialButton social="apple" theme="gray" className="w-full">
                Fortsett med Apple
            </SocialButton>
            <Button color="secondary" size="lg" className="w-full" iconLeading={Mail}>
                Fortsett med e-post
            </Button>
        </div>
        <p className="text-sm text-tertiary">
            Har du allerede en konto?{" "}
            <Button href="#" color="link-color" size="sm">
                Logg inn
            </Button>
        </p>
    </section>
);

const SectionHeading = ({ children }: { children: ReactNode }) => <h2 className="text-lg font-semibold text-primary">{children}</h2>;

/* ---------------------------------------------------------------- page */

export interface PlussArtikkelProps {
    /** False shows the paywalled state: headline, ingress and opening only. */
    isSubscriber?: boolean;
}

export const PlussArtikkel = ({ isSubscriber = true }: PlussArtikkelProps) => (
    <div className="min-h-dvh bg-secondary_alt">
        <SiteHeader
            brand="fa"
            navigation={navigation}
            shortcuts={shortcuts}
            tickerItems={tickerItems}
            menu={menu}
            user={isSubscriber ? { initials: "NN", href: "/min-side" } : undefined}
        />

        <main className="bg-primary_alt">
            <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
                {/* Article header */}
                <header className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <BadgeWithIcon iconLeading={Lock} color="brand" size="md" type="pill-color">
                            Pluss
                        </BadgeWithIcon>
                        <a href="#" className="rounded-full outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                            <Badge color="gray" size="md" type="pill-color">
                                Shipping
                            </Badge>
                        </a>
                        <p className="text-xs text-tertiary">Publisert 11:39</p>
                    </div>
                    <h1 className="flex flex-col gap-1">
                        <span className="text-md font-semibold text-brand-secondary">Andreas Wold Hofstad (31):</span>
                        <span className="text-display-sm font-bold text-primary md:text-display-md">Shorter shippingaksje for 25 millioner</span>
                    </h1>
                    <p className="text-lg font-medium text-tertiary md:text-xl">
                        Investoren har bygget en shortposisjon i et børsnotert tankrederi etter en kraftig kursoppgang. – Dette har jeg ikke opplevd før, sier
                        han.
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-y border-secondary py-3">
                        <AvatarLabelGroup size="md" initials="EA" alt="" title="Eivind Aakre" subtitle="Journalist" />
                        <div className="flex items-center gap-2">
                            <Button href="mailto:tips@finansavisen.no" color="secondary" size="sm" iconLeading={Mail}>
                                Tips meg
                            </Button>
                            <ButtonUtility icon={Share} tooltip="Del saken" color="secondary" size="sm" />
                            <ButtonUtility icon={LinkIcon} tooltip="Kopier lenke" color="secondary" size="sm" />
                        </div>
                    </div>
                </header>

                {/* Photo */}
                <figure className="flex flex-col gap-2">
                    <div role="img" aria-label="Bilde av investor Andreas Wold Hofstad" className="aspect-3/2 w-full rounded-xl bg-tertiary" />
                    <figcaption className="text-sm text-tertiary">
                        Andreas Wold Hofstad mener tankmarkedet er priset for høyt. FOTO: Eksempelfotograf / Finansavisen
                    </figcaption>
                </figure>

                {/* Body */}
                <div className="prose max-w-none">
                    <p>
                        Andreas Wold Hofstad har de siste ukene solgt ut aksjer i Bruton og International Seaways han ikke eier. Samlet verdi på
                        shortposisjonene er rundt 25 millioner kroner, ifølge Finansavisens beregninger.
                    </p>

                    {isSubscriber && (
                        <>
                            <h2 className="text-xl font-bold">En uvanlig posisjon</h2>
                            <p>
                                Den 31 år gamle investoren er kjent for å ta store posisjoner i norske selskaper. At han nå shorter amerikanske og europeiske
                                tankrederier, er noe nytt.
                            </p>
                            <StockInset stock={stocks[0]} />
                            <p>– Rateene er historisk høye, og markedet priser inn at det fortsetter. Jeg tror det er for optimistisk, sier Hofstad.</p>
                            <blockquote className="not-italic">
                                <p className="font-bold text-primary">«Ikke opplevd før»</p>
                            </blockquote>
                            <p>
                                Han beskriver den siste perioden som spesiell: – Jeg har aldri sett en slik kombinasjon av høye rater og så lav aktivitet i
                                nybyggmarkedet. Det er ikke opplevd før.
                            </p>
                            <h2 className="text-xl font-bold">Frykter at festen snur</h2>
                            <p>
                                International Seaways har steget kraftig det siste året. Hofstad mener veksten i stor grad er hentet inn og at nedsiden er
                                undervurdert.
                            </p>
                            <StockInset stock={stocks[1]} />
                            <p>Porteføljen hans er i dag på rundt 22 millioner kroner fordelt på seks aksjer, der LUMI er den største enkeltinvesteringen.</p>
                            <InvestorInset />
                            <p>Finansavisen har forsøkt å få kommentarer fra selskapene, men har ikke lykkes før publisering.</p>
                        </>
                    )}
                </div>

                {!isSubscriber && <PaywallBox />}

                {isSubscriber && (
                    <>
                        {/* Follow in MittFa */}
                        <section aria-labelledby="mittfa-title" className={cx(inset, "flex flex-col gap-3")}>
                            <h2 id="mittfa-title" className="text-md font-semibold text-primary">
                                Legg til MittFa
                            </h2>
                            <p className="text-sm text-tertiary">Følg for å få varsler når det kommer nye saker.</p>
                            <div className="flex flex-wrap gap-2">
                                <FollowChip label="Andreas Wold Hofstad" avatar="AH" />
                                <FollowChip label="Bruton (BRUT)" />
                                <FollowChip label="International Seaways (INSW.US)" />
                                <FollowChip label="Shipping" />
                                <FollowChip label="Eivind Aakre" avatar="EA" />
                            </div>
                        </section>

                        {/* Related */}
                        <section aria-labelledby="related-title" className="flex flex-col gap-3">
                            <SectionHeading>
                                <span id="related-title">Relatert sak</span>
                            </SectionHeading>
                            <a
                                href="#"
                                className="flex flex-col gap-1 rounded-xl border border-secondary p-4 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <span className="text-xs text-tertiary">Shipping · Pluss · I går</span>
                                <span className="text-md font-semibold text-primary">Tankrederiene kjøper tilbake aksjer for rekordsummer</span>
                            </a>
                        </section>

                        {/* AI note */}
                        <div className={cx(inset, "flex items-start gap-3")}>
                            <Info className="mt-0.5 size-5 shrink-0 text-fg-quaternary" />
                            <p className="text-sm text-tertiary">
                                Finansavisen bruker kunstig intelligens som hjelpemiddel i noen saker. Her er KI brukt til å hente ut kurs- og porteføljetall.
                                Journalisten har kontrollert innholdet.
                            </p>
                        </div>

                        {/* Comments */}
                        <section aria-labelledby="comments-title" className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-3">
                                <SectionHeading>
                                    <span id="comments-title">Kommentarer ({comments.length})</span>
                                </SectionHeading>
                                <Button color="secondary" size="sm" iconLeading={Chat}>
                                    Skriv kommentar
                                </Button>
                            </div>
                            <ul className="flex flex-col">
                                {comments.map((c) => (
                                    <li key={c.name} className="flex gap-3 border-b border-secondary py-4 first:pt-0">
                                        <Avatar
                                            size="sm"
                                            initials={c.name
                                                .split(" ")
                                                .map((w) => w[0])
                                                .slice(0, 2)
                                                .join("")}
                                            alt=""
                                        />
                                        <div className="flex min-w-0 flex-col gap-1">
                                            <p className="text-sm font-medium text-primary">
                                                {c.name} <span className="text-xs font-normal text-tertiary">· {c.time}</span>
                                            </p>
                                            <p className="text-sm text-tertiary">{c.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Further reading */}
                        <section aria-labelledby="more-title" className="flex flex-col gap-3">
                            <SectionHeading>
                                <span id="more-title">Les også</span>
                            </SectionHeading>
                            <ul className="flex flex-col">
                                {furtherReading.map((r) => (
                                    <li key={r.title} className="border-b border-secondary last:border-b-0">
                                        <a
                                            href={r.href}
                                            className="flex flex-col gap-1 rounded-xs py-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            <span className="text-xs text-tertiary">{r.meta}</span>
                                            <span className="text-sm font-semibold text-primary">{r.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </>
                )}
            </article>
        </main>

        <SiteFooter
            brand="fa"
            links={footerLinks}
            publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, PO Box 724 Skøyen, 0214 Oslo", "Sjefredaktør/adm.dir: Trygve Hegnar"]}
            copyright="©2026 Hegnar Media AS"
            disclaimer="Børsdata levert av Millistream. Nikkei 225 ©Nikkei Inc. TradingView Lightweight Charts™ og TradingView Advanced Charts™ er levert av TradingView, Inc."
            disclaimerHref="/om-data"
        />
    </div>
);
