"use client";

import { useState } from "react";
import type { FC, ReactNode } from "react";
import {
    Ai,
    ArrowRight,
    ChevronRight,
    Eye,
    Flame,
    GraphLine,
    Image as ImageIcon,
    KapitalSmallLogo,
    Lock,
    MotorLogo,
    Play,
    Plus,
    Star,
    StarFilled,
    User,
    Users,
} from "fa-icons";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import type { SiteNavItem } from "@/components/application/site-header/site-brands";
import { SiteHeader } from "@/components/application/site-header/site-header";
import type { SiteMenuContent } from "@/components/application/site-header/site-menu-panel";
import type { TickerItem } from "@/components/application/site-header/ticker-bar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { getInitials } from "@/components/base/avatar/utils";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

/* -------------------------------------------------------------------------------------------------
 * Data (placeholder where the brief gives no figure; see 01-forside.notes.md)
 * -----------------------------------------------------------------------------------------------*/

const tickerItems: TickerItem[] = [
    { label: "Oslo Børs", value: "2 126,86", change: "0,09%", direction: "up", href: "/ticker/OSEBX" },
    { label: "Brent spot", value: "114,93", change: "-0,20%", direction: "down", href: "/ticker/Brent%20Spot%3DF" },
    { label: "Nikkei 225", value: "41 872,15", change: "0,62%", direction: "up", href: "/ticker/N225" },
    { label: "Bitcoin", value: "1 021 480", change: "-1,34%", direction: "down", href: "/ticker/BTCNOK" },
    { label: "EUR/NOK", value: "10,40", change: "0,12%", direction: "up", href: "/ticker/EURNOK" },
    { label: "USD/NOK", value: "9,32", change: "-0,08%", direction: "down", href: "/ticker/USDNOK" },
    { label: "Gull", value: "3 412,60", change: "0,41%", direction: "up", href: "/ticker/XAUUSD" },
    { label: "US 10 år", value: "4,21", change: "-0,47%", direction: "down", href: "/ticker/US10Y" },
];

const navigation: SiteNavItem[][] = [
    [
        { label: "Siste nytt", href: "/siste" },
        { label: "MittFa", href: "/mittfa" },
    ],
    [
        {
            label: "Børs",
            href: "/bors",
            items: [
                { label: "Børsoversikt", href: "/bors" },
                { label: "Råvarer", href: "/raavarer" },
                { label: "Valuta", href: "/valuta" },
                { label: "Rapporter", href: "/rapporter" },
            ],
        },
        { label: "Investorchat", href: "/investorchat" },
        { label: "Watchlist", href: "/watchlist" },
        { label: "Forum", href: "/forum" },
        { label: "Bjellesauer", href: "/bjellesauer" },
    ],
    [
        { label: "Kapital", href: "/kapital" },
        { label: "Motor", href: "/motor" },
        { label: "Video", href: "/tv" },
        { label: "Karriere", href: "/karriere" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors" },
    { label: "Watchlist", href: "/watchlist" },
    { label: "Forum", href: "/forum" },
    { label: "Bjellesauer", href: "/bjellesauer" },
    { label: "Investorchat", href: "/investorchat" },
];

const menu: SiteMenuContent = {
    columns: [
        {
            title: "Børs",
            href: "/bors",
            items: [
                { label: "Børsoversikt", href: "/bors" },
                { label: "Watchlist", href: "/watchlist" },
                { label: "Bjellesauer", href: "/bjellesauer" },
                { label: "Forum", href: "/forum" },
            ],
        },
        {
            title: "Video",
            href: "/tv",
            items: [
                { label: "Børsmorgen", href: "/tv/borsmorgen" },
                { label: "Fa Direkte", href: "/tv/fa-direkte" },
            ],
        },
    ],
    highlights: [
        { label: "Min side", href: "/min-side" },
        { label: "Last ned app", href: "/app" },
    ],
    eAvis: { weekday: "Tirsdag", date: "27.10.2026", href: "/eavis" },
};

const footerLinks: SiteNavItem[][] = [
    [
        { label: "eAvis", href: "/eavis" },
        { label: "Annonse", href: "/annonse" },
        { label: "Karriere", href: "/karriere" },
        { label: "Bedriftsabonnement", href: "/bedrift" },
    ],
    [
        { label: "Personvernerklæring", href: "/personvern" },
        { label: "Vilkår", href: "/vilkar" },
        { label: "Samtykkeinnstillinger", href: "/samtykke" },
    ],
];

type Marker = "siste" | "populaert" | "mye-lest" | "borsoppdatering" | "pluss";

interface Story {
    id: string;
    href: string;
    headline: string;
    kicker?: string;
    hasImage?: boolean;
    markers?: Marker[];
}

const leadStory: Story = {
    id: "lead",
    href: "/naeringsliv/dyve-kjoper",
    kicker: "Fredrik Dyve forhandlet i måneder:",
    headline: "Kjøper rederi for 4,2 milliarder – sikrer seg ti nye LNG-skip",
    hasImage: true,
    markers: ["pluss", "populaert"],
};

const stories: Story[] = [
    {
        id: "s1",
        href: "/bors/equinor-utbytte",
        kicker: "Ekstraordinært utbytte:",
        headline: "Equinor øker tilbakekjøpet etter rekordhøy oljepris",
        hasImage: true,
        markers: ["siste"],
    },
    {
        id: "s2",
        href: "/bors/mowi-kollaps",
        headline: "Lakseprisen stuper – Mowi og Salmar faller tungt på Oslo Børs",
        hasImage: true,
        markers: ["mye-lest"],
    },
    {
        id: "s3",
        href: "/makro/norges-bank-rente",
        kicker: "Ida Wolden Bache:",
        headline: "Norges Bank holder renten i ro, men åpner for kutt i desember",
        markers: ["pluss"],
    },
    {
        id: "s4",
        href: "/eiendom/olav-thon",
        headline: "Thon-gruppen selger kjøpesentre for 3 milliarder kroner",
        markers: ["populaert"],
    },
    {
        id: "s5",
        href: "/bors/borsoppdatering-rigg",
        kicker: "Oppgang på Oslo Børs:",
        headline: "Borr Drilling og Odfjell Drilling til værs etter ny kontrakt i Brasil",
        hasImage: true,
        markers: ["borsoppdatering"],
    },
    {
        id: "s6",
        href: "/teknologi/kongsberg-ordre",
        headline: "Kongsberg Gruppen henter forsvarsordre verdt 9 milliarder",
        hasImage: true,
        markers: ["pluss", "mye-lest"],
    },
];

const mostRead = [
    { href: "/bors/mowi-kollaps", headline: "Lakseprisen stuper – Mowi og Salmar faller tungt på Oslo Børs" },
    { href: "/naeringsliv/dyve-kjoper", headline: "Kjøper rederi for 4,2 milliarder – sikrer seg ti nye LNG-skip", pluss: true },
    { href: "/bors/equinor-utbytte", headline: "Equinor øker tilbakekjøpet etter rekordhøy oljepris" },
    { href: "/kapital/rikeste-arvinger", headline: "De unge arvingene som eier mest på Oslo Børs", pluss: true },
    { href: "/makro/norges-bank-rente", headline: "Norges Bank holder renten i ro, men åpner for kutt i desember", pluss: true },
];

const topics = [
    { id: "shipping", label: "Shipping" },
    { id: "olje", label: "Olje og gass" },
    { id: "sjomat", label: "Sjømat" },
    { id: "eqnr", label: "Equinor (EQNR)" },
    { id: "makro", label: "Makro" },
];

const jobs = [
    { title: "Porteføljeforvalter, nordiske aksjer", employer: "Fjordkyst Kapitalforvaltning", place: "Oslo" },
    { title: "Finansdirektør (CFO)", employer: "Havbris Sjømat AS", place: "Bergen" },
    { title: "Senior aksjeanalytiker", employer: "Nordvik Securities", place: "Oslo" },
];

/* -------------------------------------------------------------------------------------------------
 * Composed pieces (no Figma component yet; see notes)
 * -----------------------------------------------------------------------------------------------*/

const card = "rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5";
const focusRing = "rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2";
const headlineLink = cx(focusRing, "transition hover:underline");

/** Teaser marker ("Pluss", "Siste", …). Stand-in: a Badge per marker; the text carries the meaning. */
const MarkerBadge = ({ marker }: { marker: Marker }) => {
    switch (marker) {
        case "pluss":
            return (
                <BadgeWithIcon color="brand" size="sm" iconLeading={Lock}>
                    Pluss
                </BadgeWithIcon>
            );
        case "siste":
            return (
                <BadgeWithDot color="error" size="sm">
                    Siste
                </BadgeWithDot>
            );
        case "populaert":
            return (
                <BadgeWithIcon color="orange-dark" size="sm" iconLeading={Flame}>
                    Populært
                </BadgeWithIcon>
            );
        case "mye-lest":
            return (
                <BadgeWithIcon color="gray" size="sm" iconLeading={Eye}>
                    Mye lest
                </BadgeWithIcon>
            );
        case "borsoppdatering":
            return (
                <BadgeWithIcon color="blue-light" size="sm" iconLeading={GraphLine}>
                    Børsoppdatering
                </BadgeWithIcon>
            );
    }
};

/** Image placeholder: the brief gives no photos. Replace with the article image. */
const ImagePlaceholder = ({ className }: { className?: string }) => (
    <div aria-hidden="true" className={cx("flex aspect-video w-full items-center justify-center rounded-xl bg-tertiary", className)}>
        <ImageIcon className="size-6 text-fg-quaternary" />
    </div>
);

const CardHeader = ({
    icon,
    color = "brand",
    title,
    href,
    linkLabel,
    id,
}: {
    icon: FC<{ className?: string }>;
    color?: "brand" | "gray" | "success" | "error" | "warning";
    title: ReactNode;
    href?: string;
    linkLabel?: string;
    id: string;
}) => (
    <header className="mb-3 flex items-center gap-3">
        <FeaturedIcon icon={icon} color={color} theme="light" size="sm" />
        <h2 id={id} className="text-lg font-semibold text-primary">
            {title}
        </h2>
        {href && <ButtonUtility icon={ChevronRight} href={href} tooltip={linkLabel} className="ml-auto" />}
    </header>
);

/** Article teaser — no component yet. */
const Teaser = ({ story, variant = "default" }: { story: Story; variant?: "lead" | "default" | "compact" }) => {
    const isLead = variant === "lead";
    const showImage = story.hasImage && variant !== "compact";

    return (
        <article className="flex flex-col gap-3">
            {showImage && (
                <a href={story.href} tabIndex={-1} aria-hidden="true">
                    <ImagePlaceholder />
                </a>
            )}
            {story.markers && story.markers.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {story.markers.map((m) => (
                        <MarkerBadge key={m} marker={m} />
                    ))}
                </div>
            )}
            <div className="flex items-start gap-3">
                <h3
                    className={cx(
                        "flex-1 font-bold text-primary",
                        isLead ? "text-display-xs md:text-display-sm" : variant === "compact" ? "text-md" : "text-lg md:text-xl",
                    )}
                >
                    <a href={story.href} className={headlineLink}>
                        {story.kicker && <span className="text-brand-secondary">{story.kicker} </span>}
                        {story.headline}
                    </a>
                </h3>
                <ButtonUtility icon={Plus} size="xs" color="tertiary" tooltip="Lagre i MittFa" />
            </div>
        </article>
    );
};

/** Change value — no component yet (page-patterns.md). */
const Change = ({ value }: { value: number }) => (
    <span className={cx("tabular-nums", value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary")}>
        {new Intl.NumberFormat("nb-NO", { style: "percent", minimumFractionDigits: 2, signDisplay: "exceptZero" }).format(value / 100)}
    </span>
);

/* -------------------------------------------------------------------------------------------------
 * Sections
 * -----------------------------------------------------------------------------------------------*/

const Greeting = ({ userName }: { userName?: string }) =>
    userName ? (
        <section aria-label="Velkommen" className={cx(card, "flex flex-col gap-3 md:flex-row md:items-center md:justify-between")}>
            <div>
                <p className="text-lg font-semibold text-primary">God morgen, {userName}</p>
                <p className="text-sm text-tertiary">
                    Din watchlist er opp <Change value={0.84} /> i dag. Tre av aksjene dine har nyheter siden i går.
                </p>
            </div>
            <Button href="/watchlist" color="secondary" iconTrailing={ArrowRight} className="self-start md:self-auto">
                Gå til watchlist
            </Button>
        </section>
    ) : (
        <section aria-label="Lag konto" className={cx(card, "flex flex-col gap-4 md:flex-row md:items-center")}>
            <FeaturedIcon icon={User} color="brand" theme="light" size="md" />
            <div className="flex-1">
                <p className="text-lg font-semibold text-primary">Lag en gratis konto</p>
                <p className="text-sm text-tertiary">Følg aksjer og temaer, lag din egen watchlist og få varsler – helt gratis.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <Button href="/registrer" color="primary">
                    Opprett gratis konto
                </Button>
                <Button href="/logg-inn" color="link-gray">
                    Logg inn
                </Button>
            </div>
        </section>
    );

const InvestorchatCard = () => (
    <section aria-labelledby="investorchat-title" className={card}>
        <CardHeader id="investorchat-title" icon={Ai} title="Investorchat" href="/investorchat" linkLabel="Åpne Investorchat" />
        <form action="/investorchat" className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Input
                name="q"
                label="Søk på ticker eller spør Investorchat"
                placeholder="F.eks. EQNR eller «Hvorfor faller sjømat?»"
                icon={Ai}
                className="flex-1"
            />
            <Button type="submit" color="secondary" className="self-start sm:self-auto">
                Spør
            </Button>
        </form>
        <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-tertiary">Forslag:</span>
            {["Oppsummer dagens børs", "Hva skjer med oljeprisen?", "Analyser nøkkeltall for MOWI"].map((p) => (
                <Button key={p} color="secondary" size="sm" href={`/investorchat?q=${encodeURIComponent(p)}`}>
                    {p}
                </Button>
            ))}
        </div>
    </section>
);

const NewsStream = () => (
    <section aria-labelledby="toppsaker-title" className={card}>
        <h2 id="toppsaker-title" className="sr-only">
            Toppsaker
        </h2>
        <div className="flex flex-col gap-6">
            <Teaser story={leadStory} variant="lead" />
            <div className="grid grid-cols-1 gap-6 border-t border-secondary pt-6 md:grid-cols-2">
                {stories.slice(0, 2).map((s) => (
                    <Teaser key={s.id} story={s} />
                ))}
            </div>
            <ul className="flex flex-col border-t border-secondary">
                {stories.slice(2, 4).map((s) => (
                    <li key={s.id} className="border-b border-secondary py-4">
                        <Teaser story={s} variant="compact" />
                    </li>
                ))}
            </ul>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {stories.slice(4).map((s) => (
                    <Teaser key={s.id} story={s} />
                ))}
            </div>
        </div>
    </section>
);

const SponsoredCard = () => (
    <aside aria-label="Annonse" className={card}>
        <div className="mb-3 flex items-center gap-2">
            <Badge color="gray" size="sm">
                Annonse
            </Badge>
            <span className="text-xs text-tertiary">Innhold fra Fjordkyst Kapitalforvaltning – ikke skrevet av Finansavisens journalister</span>
        </div>
        <div className="flex flex-col gap-4 rounded-xl bg-tertiary p-3 md:flex-row md:items-center">
            <ImagePlaceholder className="md:w-48" />
            <div className="flex-1">
                <p className="text-md font-bold text-primary">
                    <a href="/annonse/fjordkyst-fond" className={headlineLink}>
                        Slik bygger du en robust fondsportefølje i et urolig rentemarked
                    </a>
                </p>
            </div>
        </div>
    </aside>
);

const FollowTopics = () => {
    const [followed, setFollowed] = useState<Set<string>>(new Set(["shipping"]));
    const toggle = (id: string) =>
        setFollowed((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });

    return (
        <section aria-labelledby="folg-title" className={card}>
            <h2 id="folg-title" className="mb-1 text-lg font-semibold text-primary">
                Følg temaer
            </h2>
            <p className="mb-3 text-sm text-tertiary">Saker om temaene du følger havner i MittFa.</p>
            <div className="flex flex-wrap gap-2">
                {topics.map((t) => {
                    const on = followed.has(t.id);
                    return (
                        <Button key={t.id} color="secondary" size="sm" aria-pressed={on} iconTrailing={on ? StarFilled : Star} onPress={() => toggle(t.id)}>
                            {t.label}
                        </Button>
                    );
                })}
            </div>
        </section>
    );
};

const BorsoppdateringCard = () => (
    <section aria-labelledby="borsoppdatering-title" className={card}>
        <CardHeader id="borsoppdatering-title" icon={GraphLine} title="Børsoppdatering" href="/bors/borsoppdatering" linkLabel="Alle børsoppdateringer" />
        <div className="mb-2 flex items-center gap-2">
            <BadgeWithDot color="error" size="sm">
                Live
            </BadgeWithDot>
            <span className="text-xs text-tertiary">Oppdatert 14:32</span>
        </div>
        <p className="text-lg font-bold text-primary">
            <a href="/bors/borsoppdatering-rally-rigg" className={headlineLink}>
                Rally i rigg og oljemygg – full kollaps i sjømat
            </a>
        </p>
        <dl className="mt-3 flex flex-col">
            {[
                { label: "Oslo Børs", value: "2 126,86", change: 0.09 },
                { label: "Borr Drilling", value: "38,12", change: 6.41 },
                { label: "Mowi", value: "171,40", change: -7.85 },
            ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 border-b border-secondary py-2 text-sm last:border-b-0">
                    <dt className="text-secondary">{row.label}</dt>
                    <dd className="flex gap-2 tabular-nums">
                        <span className="text-primary">{row.value}</span>
                        <Change value={row.change} />
                    </dd>
                </div>
            ))}
        </dl>
    </section>
);

const MostReadCard = () => (
    <section aria-labelledby="mestlest-title" className={card}>
        <CardHeader id="mestlest-title" icon={Eye} color="gray" title="Mest lest" href="/mest-lest" linkLabel="Se alle mest leste" />
        <ol className="flex flex-col">
            {mostRead.map((item, i) => (
                <li key={item.href} className="flex gap-3 border-b border-secondary py-3 last:border-b-0">
                    <span aria-hidden="true" className="w-5 shrink-0 text-lg font-bold text-brand-secondary tabular-nums">
                        {i + 1}
                    </span>
                    <div className="flex items-start gap-1.5">
                        {item.pluss && <Lock aria-label="Pluss-artikkel" className="mt-0.5 size-4 shrink-0 text-fg-brand-primary" />}
                        <a href={item.href} className={cx(headlineLink, "text-sm font-semibold text-primary")}>
                            {item.headline}
                        </a>
                    </div>
                </li>
            ))}
        </ol>
    </section>
);

const CommentaryCard = () => (
    <section aria-labelledby="kommentar-title" className={card}>
        <h2 id="kommentar-title" className="mb-3 text-lg font-semibold text-primary">
            Kommentar
        </h2>
        <AvatarLabelGroup size="md" initials={getInitials("Trygve Hegnar")} alt="" title="Trygve Hegnar" subtitle="Ansvarlig redaktør" />
        <p className="mt-3 text-xl font-bold text-primary italic">
            <a href="/meninger/hegnar-skatt" className={headlineLink}>
                Skattejaget på gründerne har kostet Norge mer enn det har gitt
            </a>
        </p>
        <div className="mt-2">
            <MarkerBadge marker="pluss" />
        </div>
    </section>
);

const VideoCard = () => (
    <section aria-labelledby="video-title" className={card}>
        <CardHeader id="video-title" icon={Play} title="Børsmorgen" href="/tv/borsmorgen" linkLabel="Alle episoder av Børsmorgen" />
        <ImagePlaceholder />
        <p className="mt-3 text-md font-bold text-primary">Oljeprisen over 110 dollar: Dette betyr det for Oslo Børs i dag</p>
        <p className="mt-1 text-xs text-tertiary">27. okt. · 12 min</p>
        <Button href="/tv/borsmorgen/2026-10-27" color="secondary" iconLeading={Play} className="mt-3">
            Spill av Børsmorgen
        </Button>
    </section>
);

const PublicationCard = ({
    logo: Logo,
    name,
    homeHref,
    href,
    headline,
    label,
}: {
    logo: FC<{ className?: string }>;
    name: string;
    homeHref: string;
    href: string;
    headline: string;
    label: string;
}) => (
    <section aria-label={name} className={card}>
        <a href={homeHref} aria-label={`${name} – til forsiden`} className={cx(focusRing, "inline-block")}>
            <Logo className="h-6 w-auto text-fg-primary" />
        </a>
        <ImagePlaceholder className="mt-3" />
        <p className="mt-3 text-md font-bold text-primary">
            <a href={href} className={headlineLink}>
                {headline}
            </a>
        </p>
        <p className="mt-1 text-xs text-tertiary">{label}</p>
    </section>
);

const CareerCard = () => (
    <section aria-labelledby="karriere-title" className={card}>
        <CardHeader id="karriere-title" icon={Users} title="Karriere" href="/karriere" linkLabel="Alle stillinger" />
        <p className="mb-2 text-xs text-tertiary">Stillingsannonser</p>
        <ul className="flex flex-col">
            {jobs.map((job) => (
                <li key={job.title} className="flex flex-col border-b border-secondary py-3 last:border-b-0">
                    <a href="/karriere" className={cx(headlineLink, "text-sm font-semibold text-primary")}>
                        {job.title}
                    </a>
                    <span className="text-xs text-tertiary">
                        {job.employer} · {job.place}
                    </span>
                </li>
            ))}
        </ul>
    </section>
);

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

export interface ForsideProps {
    /** First name of the signed-in reader; leave out for a logged-out reader. */
    userName?: string;
}

export const Forside = ({ userName }: ForsideProps) => (
    <div className="min-h-dvh bg-secondary_alt">
        <SiteHeader
            brand="fa"
            className="sticky top-0 z-30"
            tickerItems={tickerItems}
            navigation={navigation}
            shortcuts={shortcuts}
            menu={menu}
            user={userName ? { initials: getInitials(userName), href: "/min-side" } : undefined}
            loginHref="/logg-inn"
            subscribeHref="/abonnement"
            onSearchPress={() => {
                // Prototype: the app opens its search view here.
            }}
        />
        <main className="mx-auto w-full max-w-container px-4 py-6 md:px-8">
            <h1 className="sr-only">Finansavisen – forsiden</h1>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <Greeting userName={userName} />
                    <NewsStream />
                    <InvestorchatCard />
                    <SponsoredCard />
                    <FollowTopics />
                </div>
                <aside aria-label="Mer fra Finansavisen" className="flex flex-col gap-6">
                    <BorsoppdateringCard />
                    <MostReadCard />
                    <CommentaryCard />
                    <VideoCard />
                    <PublicationCard
                        logo={KapitalSmallLogo}
                        name="Kapital"
                        homeHref="/kapital"
                        href="/kapital/rikeste-arvinger"
                        headline="De unge arvingene som eier mest på Oslo Børs"
                        label="Fra Kapital"
                    />
                    <PublicationCard
                        logo={MotorLogo}
                        name="Motor"
                        homeHref="/motor"
                        href="/motor/test-elbil"
                        headline="Test: Den nye elbilen som slår Tesla på rekkevidde"
                        label="Fra Motor"
                    />
                    <CareerCard />
                </aside>
            </div>
        </main>
        <SiteFooter
            brand="fa"
            links={footerLinks}
            publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, 0214 Oslo", "Sjefredaktør/adm.dir: Trygve Hegnar"]}
            copyright="©2026 Hegnar Media AS"
            disclaimer="Børsdata levert av Millistream. Nikkei 225 ©Nikkei Inc."
            disclaimerHref="/om-data"
            contactHref="/kontakt-oss"
            appStoreHref="https://apps.apple.com/no/app/finansavisen"
            googlePlayHref="https://play.google.com/store/apps/details?id=no.finansavisen"
            socialLinks={[
                { platform: "facebook", href: "https://facebook.com/finansavisen" },
                { platform: "linkedin", href: "https://linkedin.com/company/finansavisen" },
            ]}
        />
    </div>
);

export default Forside;
