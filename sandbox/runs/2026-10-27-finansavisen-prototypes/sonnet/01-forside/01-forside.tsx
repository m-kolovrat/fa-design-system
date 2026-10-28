"use client";

import type { ReactNode } from "react";
import { ArrowRight, Bookmark, Chat, Image as ImageIcon, Lock, Play, Plus, Star } from "fa-icons";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import type { SiteNavItem } from "@/components/application/site-header/site-brands";
import { SiteHeader } from "@/components/application/site-header/site-header";
import type { TickerItem } from "@/components/application/site-header/ticker-bar";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

/* ------------------------------------------------------------------ data (placeholder) */

const tickerItems: TickerItem[] = [
    { label: "Oslo Børs", value: "2 126,86", change: "0,09%", direction: "up", href: "/ticker/OSEBX" },
    { label: "Brent spot", value: "114,93", change: "-0,20%", direction: "down", href: "/ticker/BRENT" },
    { label: "Nikkei 225", value: "38 362,53", change: "-0,84%", direction: "down", href: "/ticker/N225" },
    { label: "Bitcoin", value: "698 410", change: "1,12%", direction: "up", href: "/ticker/BTCNOK" },
    { label: "EUR/NOK", value: "10,40", change: "0,12%", direction: "up", href: "/ticker/EURNOK" },
    { label: "USD/NOK", value: "9,32", change: "-0,18%", direction: "down", href: "/ticker/USDNOK" },
    { label: "Gull", value: "3 412,10", change: "0,35%", direction: "up", href: "/ticker/XAUUSD" },
    { label: "US 10 år", value: "4,21", change: "-0,52%", direction: "down", href: "/ticker/US10Y" },
];

const navigation: SiteNavItem[][] = [
    [
        { label: "Siste nytt", href: "/siste" },
        { label: "MittFa", href: "/mittfa" },
    ],
    [
        { label: "Forum", href: "/forum" },
        { label: "Børs", href: "/bors" },
        { label: "Investorchat", href: "/investorchat" },
        { label: "Watchlist", href: "/watchlist" },
        { label: "Bjellesauer", href: "/bjellesauer" },
    ],
    [
        { label: "Video", href: "/tv" },
        { label: "Meninger", href: "/meninger" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors" },
    { label: "Watchlist", href: "/watchlist" },
    { label: "Forum", href: "/forum" },
    { label: "Bjellesauer", href: "/bjellesauer" },
];

const footerLinks: SiteNavItem[][] = [
    [
        { label: "eAvis", href: "/eavis" },
        { label: "Annonse", href: "/annonse" },
        { label: "Bedriftsabonnement", href: "/bedrift" },
    ],
    [
        { label: "Personvernerklæring", href: "/personvern" },
        { label: "Vilkår", href: "/vilkar" },
        { label: "Samtykkeinnstillinger", href: "/samtykke" },
    ],
];

type Marker = "Siste" | "Populært" | "Mye lest" | "Børsoppdatering" | "Pluss";

interface Story {
    kicker?: string;
    headline: string;
    marker?: Marker;
    time: string;
    image?: boolean;
}

const lead: Story = {
    kicker: "Fredrik Dyve forhandlet i måneder:",
    headline: "Nå er avtalen i havn – Dyve selger seg ned i Hoegh Autoliners med flere hundre millioner i gevinst",
    marker: "Siste",
    time: "07:42",
    image: true,
};

const stream: Story[] = [
    {
        kicker: "Oppgang på Oslo Børs:",
        headline: "Equinor løftet børsen – oljeprisen over 114 dollar fyrer opp investorene",
        marker: "Populært",
        time: "08:15",
        image: true,
    },
    { headline: "Slik tjente en småsparer fire millioner på én aksje – nå forteller han hva han gjør nå", marker: "Pluss", time: "06:30", image: true },
    { kicker: "Dramatisk kursfall:", headline: "Laksekursen stuper – Mowi og SalMar ned mer enn fem prosent", marker: "Mye lest", time: "09:03" },
    { headline: "Renteoppgjøret nærmer seg: Dette tror analytikerne Norges Bank gjør torsdag", marker: "Pluss", time: "07:05" },
    { kicker: "Eiendom:", headline: "Boligprisene steg mer enn ventet i oktober", time: "09:21" },
];

const mostRead = [
    "Equinor løftet børsen – oljeprisen over 114 dollar",
    "Slik tjente en småsparer fire millioner på én aksje",
    "Laksekursen stuper – Mowi og SalMar ned over fem prosent",
    "Dette tror analytikerne Norges Bank gjør torsdag",
    "Aker BP sparker i gang ny utbyttejakt",
];

const market: { label: string; value: string; change: number }[] = [
    { label: "Oslo Børs", value: "2 126,86", change: 0.09 },
    { label: "Brent (USD)", value: "114,93", change: -0.2 },
    { label: "Nikkei 225", value: "38 362,53", change: -0.84 },
    { label: "Bitcoin (NOK)", value: "698 410", change: 1.12 },
    { label: "EUR/NOK", value: "10,40", change: 0.12 },
    { label: "USD/NOK", value: "9,32", change: -0.18 },
    { label: "Gull (USD)", value: "3 412,10", change: 0.35 },
    { label: "US 10 år", value: "4,21", change: -0.52 },
];

/* ------------------------------------------------------------------ small pieces */

const card = "rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5";
const link = "rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 hover:underline";

const Change = ({ value }: { value: number }) => (
    <span className={cx("tabular-nums", value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary")}>
        {new Intl.NumberFormat("nb-NO", { style: "percent", minimumFractionDigits: 2, signDisplay: "exceptZero" }).format(value / 100)}
    </span>
);

const MarkerBadge = ({ marker }: { marker: Marker }) => {
    if (marker === "Pluss") {
        return (
            <BadgeWithIcon color="brand" size="sm" iconLeading={Lock}>
                Pluss
            </BadgeWithIcon>
        );
    }
    if (marker === "Siste") {
        return (
            <BadgeWithDot color="error" size="sm">
                Siste
            </BadgeWithDot>
        );
    }
    return (
        <Badge color={marker === "Børsoppdatering" ? "brand" : "gray"} size="sm">
            {marker}
        </Badge>
    );
};

const Thumb = ({ className }: { className?: string }) => (
    <div className={cx("flex items-center justify-center rounded-xl bg-tertiary text-fg-quaternary", className)} aria-hidden="true">
        <ImageIcon className="size-6" />
    </div>
);

const CardHeader = ({ title, icon, action }: { title: string; icon: typeof Star; action?: ReactNode }) => (
    <header className="mb-3 flex items-center gap-3">
        <FeaturedIcon icon={icon} color="brand" theme="light" size="sm" />
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        {action && <div className="ml-auto">{action}</div>}
    </header>
);

const Teaser = ({ story, big }: { story: Story; big?: boolean }) => (
    <article className={cx("flex gap-4", big ? "flex-col" : "flex-row")}>
        {story.image && big && <Thumb className="aspect-video w-full" />}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
                {story.marker && <MarkerBadge marker={story.marker} />}
                <time className="text-xs text-tertiary">{story.time}</time>
            </div>
            {story.kicker && <p className="text-sm font-medium text-brand-secondary">{story.kicker}</p>}
            <h3 className={cx("font-bold text-primary", big ? "text-display-xs md:text-display-sm" : "text-md")}>
                <a href="#artikkel" className={link}>
                    {story.headline}
                </a>
            </h3>
        </div>
        {story.image && !big && <Thumb className="size-24 shrink-0" />}
        <ButtonUtility icon={Bookmark} size="xs" color="tertiary" tooltip="Lagre artikkelen" className={big ? "self-start" : "shrink-0 self-start"} />
    </article>
);

/* ------------------------------------------------------------------ page */

export const Forside = ({ loggedIn = false, userName = "Kari" }: { loggedIn?: boolean; userName?: string }) => (
    <div className="min-h-dvh bg-secondary_alt">
        <SiteHeader
            brand="fa"
            navigation={navigation}
            shortcuts={shortcuts}
            tickerItems={tickerItems}
            user={loggedIn ? { initials: userName.slice(0, 2).toUpperCase(), href: "/min-side" } : undefined}
            loginHref="/logg-inn"
            subscribeHref="/abonnement"
            onSearchPress={() => {}}
        />

        <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-6 md:px-8">
            {/* Greeting / invitation */}
            {loggedIn ? (
                <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">God morgen, {userName}</h1>
            ) : (
                <>
                    <h1 className="sr-only">Finansavisen forside</h1>
                    <section className={cx(card, "flex flex-col gap-4 md:flex-row md:items-center")} aria-label="Opprett konto">
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-primary">Lag din egen watchlist – helt gratis</p>
                            <p className="text-sm text-tertiary">Opprett en gratis konto og følg aksjene, temaene og investorene du bryr deg om.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button href="/opprett-konto" size="md">
                                Opprett gratis konto
                            </Button>
                            <Button href="/logg-inn" color="secondary" size="md">
                                Logg inn
                            </Button>
                        </div>
                    </section>
                </>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main: newsroom's stories */}
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <section className={card} aria-labelledby="top-stories">
                        <h2 id="top-stories" className="sr-only">
                            Redaksjonens utvalg
                        </h2>
                        <Teaser story={lead} big />
                        <div className="mt-4 flex flex-col">
                            {stream.map((story) => (
                                <div key={story.headline} className="border-t border-secondary py-4 last:pb-0">
                                    <Teaser story={story} />
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <section className={card} aria-labelledby="meninger">
                            <CardHeader title="Meninger" icon={Chat} />
                            <div className="flex items-center gap-3 pb-3">
                                <Avatar initials="TH" size="md" alt="Trygve Hegnar" />
                                <div>
                                    <p className="text-sm font-medium text-primary">Trygve Hegnar</p>
                                    <p className="text-xs text-tertiary">Kommentar</p>
                                </div>
                            </div>
                            <h3 id="meninger" className="text-md font-bold text-primary">
                                <a href="#kommentar" className={link}>
                                    Børsen trenger flere selgere som tør å si fra
                                </a>
                            </h3>
                        </section>

                        <section className={card} aria-labelledby="video">
                            <CardHeader title="Video" icon={Play} />
                            <Thumb className="mb-3 aspect-video w-full" />
                            <div className="flex items-center gap-3">
                                <div className="min-w-0 flex-1">
                                    <h3 id="video" className="text-md font-bold text-primary">
                                        <a href="#video-side" className={link}>
                                            Børsmorgen: Oljen på vei mot 120 dollar?
                                        </a>
                                    </h3>
                                    <p className="text-xs text-tertiary">Børsmorgen · 06:45</p>
                                </div>
                                <ButtonUtility icon={Play} color="secondary" tooltip="Spill av Børsmorgen" />
                            </div>
                        </section>
                    </div>
                </div>

                {/* Sidebar: context */}
                <aside className="flex flex-col gap-6" aria-label="Marked og snarveier">
                    <section className={card} aria-labelledby="marked">
                        <CardHeader title="Markedet nå" icon={Star} action={<ButtonUtility icon={ArrowRight} href="/bors" tooltip="Til Børs" />} />
                        <dl>
                            {market.map((row) => (
                                <div key={row.label} className="flex items-center justify-between border-b border-secondary py-2 text-sm last:border-b-0">
                                    <dt className="text-tertiary">{row.label}</dt>
                                    <dd className="flex gap-3 tabular-nums">
                                        <span className="font-semibold text-primary">{row.value}</span>
                                        <Change value={row.change} />
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section className={card} aria-labelledby="borsoppdatering">
                        <CardHeader title="Børsoppdatering" icon={Play} />
                        <div className="flex items-center gap-2 pb-2">
                            <BadgeWithDot color="error" size="sm">
                                Live
                            </BadgeWithDot>
                            <time className="text-xs text-tertiary">10:12</time>
                        </div>
                        <h3 id="borsoppdatering" className="text-md font-bold text-primary">
                            <a href="#borsoppdatering-sak" className={link}>
                                Rally i rigg og oljemygg – full kollaps i sjømat
                            </a>
                        </h3>
                    </section>

                    <section className={card} aria-labelledby="mest-lest">
                        <CardHeader title="Mest lest" icon={Star} />
                        <ol className="flex flex-col">
                            {mostRead.map((title, i) => (
                                <li key={title} className="flex gap-3 border-b border-secondary py-3 last:border-b-0">
                                    <span className="text-md font-bold text-quaternary tabular-nums">{i + 1}</span>
                                    <a href="#mest-lest-sak" className={cx("text-sm font-medium text-primary", link)}>
                                        {title}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section className={card} aria-labelledby="investorchat">
                        <CardHeader title="Investorchat" icon={Chat} />
                        <h3 id="investorchat" className="sr-only">
                            Spør Investorchat
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <Button color="secondary" size="sm">
                                Oppsummer nyheter
                            </Button>
                            <Button color="secondary" size="sm">
                                Analyser nøkkeltall
                            </Button>
                        </div>
                    </section>

                    <section className={card} aria-labelledby="folg">
                        <h2 id="folg" className="mb-3 text-lg font-semibold text-primary">
                            Følg temaer
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {["Olje og energi", "Sjømat", "Rente", "Krypto"].map((topic) => (
                                <Button key={topic} color="secondary" size="sm" iconTrailing={Plus} aria-label={`Følg ${topic}`}>
                                    {topic}
                                </Button>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>

            {/* Kapital, Motor, Karriere */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                    { title: "Kapital", headline: "Norges rikeste: Slik vokste formuene i år", href: "#kapital" },
                    { title: "Motor", headline: "Elbilen som overrasket testerne mest i høst", href: "#motor" },
                    { title: "Karriere", headline: "Økonomisjef til vekstselskap i Oslo – se ledige stillinger", href: "#karriere" },
                ].map((item) => (
                    <section key={item.title} className={card}>
                        <h2 className="text-lg font-semibold text-primary">{item.title}</h2>
                        <p className="mt-2 text-md font-bold text-primary">
                            <a href={item.href} className={link}>
                                {item.headline}
                            </a>
                        </p>
                        <Button href={item.href} color="link-color" iconTrailing={ArrowRight} className="mt-3">
                            Se alle
                        </Button>
                    </section>
                ))}
            </div>

            {/* Sponsored: separate from journalism */}
            <aside aria-label="Annonse" className="rounded-xl bg-tertiary p-4 md:p-5">
                <div className="flex items-center gap-2 pb-2">
                    <Badge color="gray" size="sm" type="modern">
                        Annonse
                    </Badge>
                    <span className="text-xs text-tertiary">Betalt innhold fra Nordea</span>
                </div>
                <p className="text-md font-semibold text-primary">
                    <a href="#annonse" className={link}>
                        Slik sparer du smart til pensjonen
                    </a>
                </p>
            </aside>

            {/* App */}
            <section className={cx(card, "flex flex-col gap-3 md:flex-row md:items-center md:justify-between")}>
                <div>
                    <h2 className="text-lg font-semibold text-primary">Få Finansavisen-appen</h2>
                    <p className="text-sm text-tertiary">Kurser, varsler og nyheter der du er.</p>
                </div>
                <Button href="#app" size="md">
                    Last ned appen
                </Button>
            </section>
        </main>

        <SiteFooter
            brand="fa"
            links={footerLinks}
            publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, 0214 Oslo", "Sjefredaktør/adm.dir: Trygve Hegnar"]}
            copyright="©2026 Hegnar Media AS"
            disclaimer="Børsdata levert av Millistream."
            disclaimerHref="/om-data"
            contactHref="/kontakt-oss"
            appStoreHref="#app"
            googlePlayHref="#app"
        />
    </div>
);
