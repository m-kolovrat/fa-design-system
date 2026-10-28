import { useState } from "react";
import { ChevronRight, Download, Lock, Play, Search, Star, StarFilled } from "fa-icons";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import type { SiteNavItem } from "@/components/application/site-header/site-brands";
import { SiteHeader } from "@/components/application/site-header/site-header";
import type { SiteMenuContent } from "@/components/application/site-header/site-menu-panel";
import type { TickerItem } from "@/components/application/site-header/ticker-bar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { getInitials } from "@/components/base/avatar/utils";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";

// Every headline, figure, time and name below is invented for the prototype unless the brief gave it.
// Images are grey placeholder blocks.

const card = "rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5";

type Marker = "Siste" | "Populært" | "Mye lest" | "Børsoppdatering" | "Pluss";

interface Teaser {
    href: string;
    title: string;
    kicker?: string;
    marker?: Marker;
    time: string;
    ticker?: string;
}

const leadStory: Teaser = {
    href: "/artikkel/sjofart-avtale",
    kicker: "Fredrik Dyve forhandlet i måneder:",
    title: "Her er avtalen som kan gi norske rederier nye konkurrenter",
    marker: "Pluss",
    time: "14:02",
    ticker: "AKER",
};

const stories: Teaser[] = [
    {
        href: "/artikkel/eqnr-opp",
        kicker: "Oppgang på Oslo Børs:",
        title: "Equinor og DNB trekker indeksen opp mot lunsj",
        marker: "Populært",
        time: "13:20",
        ticker: "EQNR",
    },
    {
        href: "/artikkel/gull-rente",
        title: "Renteoverraskelsen i USA gir gull nye høyder",
        marker: "Mye lest",
        time: "12:05",
    },
    {
        href: "/artikkel/eksport",
        title: "Norske eksportører fikk et kraftig løft i september",
        marker: "Siste",
        time: "14:31",
    },
    {
        href: "/artikkel/kongsberg",
        title: "Stor investor kjøper seg opp i Kongsberg Gruppen",
        time: "11:10",
        ticker: "KOG",
    },
];

const borsoppdatering: Teaser = {
    href: "/borsoppdatering/rigg-og-sjomat",
    title: "Rally i rigg og oljemygg – full kollaps i sjømat",
    marker: "Børsoppdatering",
    time: "14:44",
};

const mostRead: Teaser[] = [
    { href: "/artikkel/mest-1", title: "Dette betaler du for strøm neste vinter", time: "09:12" },
    { href: "/artikkel/mest-2", title: "Boligprisene fortsetter ned i Oslo", time: "08:40" },
    { href: "/artikkel/mest-3", title: "Slik gjør du skatteoppgjøret billigere", time: "07:55" },
    { href: "/artikkel/mest-4", title: "Sjokkrapport fra Yara: kutter utbyttet", time: "07:30" },
];

const kapitalStories: Teaser[] = [
    { href: "/kapital/1", title: "Her er de nye skattereglene for aksjesparere", time: "10:00" },
    { href: "/kapital/2", title: "Fondene som slo indeksen i tredje kvartal", time: "09:30" },
];

const motorStories: Teaser[] = [
    { href: "/motor/1", title: "Prøvekjørt: Elbilen som tåler vinteren", time: "10:15" },
    { href: "/motor/2", title: "Dette koster bilforsikringen i 2027", time: "09:05" },
];

const jobs = [
    { href: "/karriere/1", title: "Senior analytiker, aksjer", company: "Eksempel Kapitalforvaltning", place: "Oslo" },
    { href: "/karriere/2", title: "Redaksjonssjef, nettsted", company: "Eksempel Media", place: "Oslo" },
    { href: "/karriere/3", title: "Porteføljeforvalter", company: "Eksempel Bank", place: "Bergen" },
];

const topics = ["Equinor", "Rente", "Gull", "Sjømat", "Bitcoin"];

const prompts = ["Oppsummer dagens nyheter", "Analyser Equinor", "Hva betyr renten for boligen?"];

interface MarketCell {
    label: string;
    value: string;
    change?: string;
    direction?: "up" | "down";
}

// The brief gives Oslo Børs, Brent, EUR/NOK and USD/NOK values; Nikkei, Bitcoin, gull and US 10 år have no
// figures in the brief, so their values and changes are PLACEHOLDERS.
const market: MarketCell[] = [
    { label: "Oslo Børs", value: "2 126,86", change: "+0,09 %", direction: "up" },
    { label: "Brent", value: "114,93 USD", change: "−0,20 %", direction: "down" },
    { label: "Nikkei 225", value: "52 318,40", change: "+0,41 %", direction: "up" }, // PLACEHOLDER
    { label: "Bitcoin", value: "94 215 USD", change: "−1,12 %", direction: "down" }, // PLACEHOLDER
    { label: "EUR/NOK", value: "10,40" },
    { label: "USD/NOK", value: "9,32" },
    { label: "Gull", value: "4 118 USD", change: "+0,27 %", direction: "up" }, // PLACEHOLDER
    { label: "US 10 år", value: "4,21 %", change: "+0,03 %", direction: "up" }, // PLACEHOLDER
];

const tickerItems: TickerItem[] = [
    { label: "Oslo Børs", value: "2 126,86", change: "+0,09 %", direction: "up", href: "/ticker/OSEBX" },
    { label: "Brent", value: "114,93", change: "−0,20 %", direction: "down", href: "/ticker/BRENT" },
    { label: "Nikkei 225", value: "52 318,40", change: "+0,41 %", direction: "up", href: "/ticker/N225" },
    { label: "Bitcoin", value: "94 215", change: "−1,12 %", direction: "down", href: "/ticker/BTC" },
];

const navigation: SiteNavItem[][] = [
    [
        { label: "Siste nytt", href: "/siste" },
        {
            label: "Børs",
            href: "/bors",
            items: [
                { label: "Børsoversikt", href: "/bors" },
                { label: "Råvarer", href: "/raavarer" },
            ],
        },
        { label: "Watchlist", href: "/watchlist" },
    ],
    [
        { label: "Kapital", href: "/kapital" },
        { label: "Motor", href: "/motor" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Børs", href: "/bors" },
    { label: "Watchlist", href: "/watchlist" },
    { label: "Forum", href: "/forum" },
    { label: "Bjellesauer", href: "/bjellesauer" },
];

const menu: SiteMenuContent = {
    columns: [
        {
            title: "Podcast",
            href: "/podcast",
            items: [{ label: "Aksjepodden", href: "/podcast/aksjepodden" }],
        },
    ],
};

const footerLinks: SiteNavItem[][] = [
    [
        { label: "Kontakt oss", href: "/kontakt-oss" },
        { label: "Annonse", href: "/annonse" },
    ],
    [
        { label: "Personvernerklæring", href: "/personvern" },
        { label: "Vilkår", href: "/vilkar" },
    ],
];

function markerBadge(marker: Marker) {
    switch (marker) {
        case "Siste":
            return (
                <BadgeWithDot color="error" size="sm">
                    Siste
                </BadgeWithDot>
            );
        case "Populært":
            return (
                <Badge color="warning" size="sm">
                    Populært
                </Badge>
            );
        case "Mye lest":
            return (
                <Badge color="gray" size="sm">
                    Mye lest
                </Badge>
            );
        case "Børsoppdatering":
            return (
                <Badge color="brand" size="sm">
                    Børsoppdatering
                </Badge>
            );
        case "Pluss":
            return (
                <BadgeWithIcon color="brand" size="sm" iconLeading={Lock}>
                    Pluss
                </BadgeWithIcon>
            );
    }
}

function MarketItem({ label, value, change, direction }: MarketCell) {
    const tone = direction === "up" ? "text-success-primary" : direction === "down" ? "text-error-primary" : "text-tertiary";
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-tertiary">{label}</span>
            <span className="text-sm font-semibold text-primary tabular-nums">{value}</span>
            <span className={cx("text-xs font-medium tabular-nums", tone)}>{change ?? "–"}</span>
        </div>
    );
}

function TeaserLink({ teaser, title, className }: { teaser: Teaser; title: string; className?: string }) {
    return (
        <a
            href={teaser.href}
            className={cx(
                "rounded-xs font-semibold text-primary outline-focus-ring hover:underline focus-visible:outline-2 focus-visible:outline-offset-2",
                className,
            )}
        >
            {title}
        </a>
    );
}

function StoryItem({ teaser }: { teaser: Teaser }) {
    return (
        <article className="flex gap-4 border-b border-secondary py-4 first:pt-0 last:border-b-0 last:pb-0">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    {teaser.marker && markerBadge(teaser.marker)}
                    {teaser.ticker && (
                        <Badge color="brand" size="sm">
                            {teaser.ticker}
                        </Badge>
                    )}
                    <span className="text-xs font-medium text-tertiary">{teaser.time}</span>
                </div>
                <h3 className="text-sm">
                    {teaser.kicker && <span className="font-medium text-tertiary">{teaser.kicker} </span>}
                    <TeaserLink teaser={teaser} title={teaser.title} />
                </h3>
            </div>
            {/* PLACEHOLDER image */}
            <div aria-hidden className="h-20 w-28 shrink-0 rounded-xl bg-tertiary" />
        </article>
    );
}

function LeadStory({ teaser }: { teaser: Teaser }) {
    return (
        <article className="flex flex-col gap-3">
            {/* PLACEHOLDER image */}
            <div aria-hidden className="aspect-video w-full rounded-xl bg-tertiary" />
            <div className="flex flex-wrap items-center gap-2">
                {teaser.marker && markerBadge(teaser.marker)}
                {teaser.ticker && (
                    <Badge color="brand" size="sm">
                        {teaser.ticker}
                    </Badge>
                )}
                <span className="text-xs font-medium text-tertiary">{teaser.time}</span>
            </div>
            <h3 className="text-display-xs font-semibold">
                {teaser.kicker && <span className="font-medium text-tertiary">{teaser.kicker} </span>}
                <TeaserLink teaser={teaser} title={teaser.title} />
            </h3>
        </article>
    );
}

function FollowChip({ label }: { label: string }) {
    const [followed, setFollowed] = useState(false);
    return (
        <Button color="secondary" size="sm" aria-pressed={followed} iconTrailing={followed ? StarFilled : Star} onPress={() => setFollowed((v) => !v)}>
            {label}
        </Button>
    );
}

function SignUpCard() {
    return (
        <section aria-labelledby="signup-heading" className={cx(card, "mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between")}>
            <div className="flex flex-col gap-1">
                <h2 id="signup-heading" className="text-lg font-semibold text-primary">
                    Lag en gratis konto
                </h2>
                <p className="text-sm text-tertiary">Lag din egen watchlist og følg temaene du bryr deg om.</p>
            </div>
            <div className="flex gap-3">
                <Button color="link-color" href="/logg-inn">
                    Logg inn
                </Button>
                <Button href="/registrer">Opprett gratis konto</Button>
            </div>
        </section>
    );
}

function MarketCard() {
    return (
        <section aria-labelledby="market-heading" className={card}>
            <h2 id="market-heading" className="mb-4 text-lg font-semibold text-primary">
                Markedet nå
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 lg:grid-cols-8">
                {market.map((cell) => (
                    <MarketItem key={cell.label} {...cell} />
                ))}
            </div>
        </section>
    );
}

function SearchCard() {
    return (
        <section aria-labelledby="search-heading" className={cx(card, "flex flex-col gap-4")}>
            <h2 id="search-heading" className="sr-only">
                Søk og spør Investorchat
            </h2>
            <Input label="Søk etter aksje eller tema" type="search" icon={Search} placeholder="EQNR, rente, gull" />
            <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-tertiary">Investorchat:</span>
                <div className="flex flex-wrap gap-2">
                    {prompts.map((prompt) => (
                        <Button key={prompt} color="secondary" size="sm">
                            {prompt}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StoriesCard() {
    return (
        <section aria-labelledby="stories-heading" className={card}>
            <h2 id="stories-heading" className="mb-4 text-xl font-bold text-primary">
                Redaksjonen anbefaler
            </h2>
            <div className="flex flex-col gap-6">
                <LeadStory teaser={leadStory} />
                <div className="flex flex-col">
                    {stories.map((teaser) => (
                        <StoryItem key={teaser.href} teaser={teaser} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function BorsoppdateringCard() {
    return (
        <section aria-labelledby="borsoppdatering-heading" className={card}>
            <div className="mb-3 flex items-center justify-between gap-2">
                <h2 id="borsoppdatering-heading" className="text-lg font-semibold text-primary">
                    Siste børsoppdatering
                </h2>
                <Button color="link-color" href="/borsoppdatering" iconTrailing={ChevronRight}>
                    Se alle
                </Button>
            </div>
            <article className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    {borsoppdatering.marker && markerBadge(borsoppdatering.marker)}
                    <span className="text-xs font-medium text-tertiary">{borsoppdatering.time}</span>
                </div>
                <TeaserLink teaser={borsoppdatering} title={borsoppdatering.title} className="text-md" />
            </article>
        </section>
    );
}

function SponsoredCard() {
    // Sponsored content is a separate surface (tinted, labelled) and never sits in the story list.
    return (
        <section aria-labelledby="sponsored-heading" className="flex flex-col gap-3 rounded-2xl bg-tertiary p-4 md:p-5">
            <div className="flex items-center gap-2">
                <h2 id="sponsored-heading" className="sr-only">
                    Annonsørinnhold
                </h2>
                <Badge color="gray" type="modern" size="sm">
                    Annonse
                </Badge>
                <span className="text-xs text-tertiary">Annonsør AS</span>
            </div>
            <p className="text-sm text-tertiary">Sponset av Annonsør AS. Innholdet er ikke skrevet av redaksjonen.</p>
        </section>
    );
}

function CommentaryCard() {
    return (
        <section aria-labelledby="commentary-heading" className={cx(card, "flex flex-col gap-3")}>
            <h2 id="commentary-heading" className="text-lg font-semibold text-primary">
                Kommentar
            </h2>
            <AvatarLabelGroup size="md" alt="" initials={getInitials("Trygve Hegnar")} title="Trygve Hegnar" subtitle="Kommentator" />
            <TeaserLink
                teaser={{ href: "/kommentar/hegnar", title: "Oljesjokket er ikke over ennå", time: "" }}
                title="Oljesjokket er ikke over ennå"
                className="text-md"
            />
        </section>
    );
}

function VideoCard() {
    // No video player component exists; this is a link to the video page, with no inline player.
    return (
        <section aria-labelledby="video-heading" className={cx(card, "flex flex-col gap-3 md:flex-row md:items-center")}>
            {/* PLACEHOLDER image */}
            <div aria-hidden className="aspect-video w-full shrink-0 rounded-xl bg-tertiary md:w-56" />
            <div className="flex flex-1 flex-col gap-2">
                <h2 id="video-heading" className="text-xs font-medium tracking-wide text-quaternary uppercase">
                    Video: Børsmorgen
                </h2>
                <p className="text-sm font-semibold text-primary">Børsmorgen: Oljerally og sjømat i fokus</p>
                <Button color="secondary" size="sm" href="/video/borsmorgen" iconLeading={Play}>
                    Spill av
                </Button>
            </div>
        </section>
    );
}

function MostReadCard() {
    return (
        <section aria-labelledby="mostread-heading" className={card}>
            <h2 id="mostread-heading" className="mb-3 text-lg font-semibold text-primary">
                Mest lest
            </h2>
            <ol className="flex flex-col">
                {mostRead.map((teaser, index) => (
                    <li key={teaser.href} className="flex gap-3 border-b border-secondary py-3 first:pt-0 last:border-b-0 last:pb-0">
                        <span className="text-sm font-semibold text-quaternary tabular-nums">{index + 1}</span>
                        <div className="flex flex-col gap-1">
                            <TeaserLink teaser={teaser} title={teaser.title} className="text-sm" />
                            <span className="text-xs font-medium text-tertiary">{teaser.time}</span>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}

function FollowCard() {
    return (
        <section aria-labelledby="follow-heading" className={cx(card, "flex flex-col gap-3")}>
            <h2 id="follow-heading" className="text-lg font-semibold text-primary">
                Følg tema
            </h2>
            <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                    <FollowChip key={topic} label={`Følg ${topic}`} />
                ))}
            </div>
        </section>
    );
}

function SectionListCard({ id, title, teasers, href }: { id: string; title: string; teasers: Teaser[]; href: string }) {
    return (
        <section aria-labelledby={id} className={card}>
            <div className="mb-3 flex items-center justify-between gap-2">
                <h2 id={id} className="text-lg font-semibold text-primary">
                    {title}
                </h2>
                <Button color="link-color" href={href} iconTrailing={ChevronRight}>
                    Se alle
                </Button>
            </div>
            <ul className="flex flex-col">
                {teasers.map((teaser) => (
                    <li key={teaser.href} className="flex flex-col gap-1 border-b border-secondary py-3 first:pt-0 last:border-b-0 last:pb-0">
                        <TeaserLink teaser={teaser} title={teaser.title} className="text-sm" />
                        <span className="text-xs font-medium text-tertiary">{teaser.time}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function CareerCard() {
    return (
        <section aria-labelledby="karriere-heading" className={card}>
            <div className="mb-3 flex items-center justify-between gap-2">
                <h2 id="karriere-heading" className="text-lg font-semibold text-primary">
                    Karriere
                </h2>
                <Button color="link-color" href="/karriere" iconTrailing={ChevronRight}>
                    Se alle
                </Button>
            </div>
            <ul className="flex flex-col">
                {jobs.map((job) => (
                    <li key={job.href} className="flex flex-col gap-1 border-b border-secondary py-3 first:pt-0 last:border-b-0 last:pb-0">
                        <TeaserLink teaser={{ href: job.href, title: job.title, time: "" }} title={job.title} className="text-sm" />
                        <span className="text-xs font-medium text-tertiary">
                            {job.company} · {job.place}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function ShortcutsCard() {
    return (
        <section aria-labelledby="shortcuts-heading" className={cx(card, "flex flex-col gap-3")}>
            <h2 id="shortcuts-heading" className="text-lg font-semibold text-primary">
                Gå til
            </h2>
            <div className="grid grid-cols-2 gap-2">
                {shortcuts.map((link) => (
                    <Button key={link.href} color="secondary" href={link.href} className="justify-center">
                        {link.label}
                    </Button>
                ))}
            </div>
            <Button color="link-color" href="/app" iconLeading={Download}>
                Få appen
            </Button>
        </section>
    );
}

export interface ForsideProps {
    user?: { firstName: string; initials: string };
}

export default function Forside({ user }: ForsideProps) {
    return (
        <div className="min-h-dvh bg-secondary_alt">
            <SiteHeader
                brand="fa"
                className="sticky top-0 z-30"
                tickerItems={tickerItems}
                navigation={navigation}
                shortcuts={shortcuts}
                menu={menu}
                user={user ? { initials: user.initials, href: "/min-side" } : undefined}
                loginHref="/logg-inn"
                subscribeHref="/abonnement"
                onSearchPress={() => document.querySelector<HTMLInputElement>('input[type="search"]')?.focus()}
            />
            <main className="mx-auto w-full max-w-container px-4 py-6 md:px-8">
                <h1 className="mb-6 text-display-xs font-semibold text-primary">{user ? `Hei, ${user.firstName}` : "Velkommen til Finansavisen"}</h1>
                {!user && <SignUpCard />}
                <div className="flex flex-col gap-6">
                    <MarketCard />
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="flex flex-col gap-6 lg:col-span-2">
                            <SearchCard />
                            <StoriesCard />
                            <BorsoppdateringCard />
                            <SponsoredCard />
                            <CommentaryCard />
                            <VideoCard />
                        </div>
                        <aside className="flex flex-col gap-6">
                            <MostReadCard />
                            <FollowCard />
                            <SectionListCard id="kapital-heading" title="Kapital" teasers={kapitalStories} href="/kapital" />
                            <SectionListCard id="motor-heading" title="Motor" teasers={motorStories} href="/motor" />
                            <CareerCard />
                            <ShortcutsCard />
                        </aside>
                    </div>
                </div>
            </main>
            <SiteFooter
                brand="fa"
                links={footerLinks}
                publisherInfo={["Utgis av Hegnar Media AS"]}
                copyright="©2026 Hegnar Media AS"
                disclaimer="Kursdata er forsinket."
                contactHref="/kontakt-oss"
                appStoreHref="/app"
                googlePlayHref="/app"
            />
        </div>
    );
}
