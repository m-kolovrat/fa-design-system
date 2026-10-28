"use client";

import { type ReactNode, useState } from "react";
import { Ai, ArrowRight, Chat, Image as ImageIcon, Link as LinkIcon, Lock, Mail, Plus, Share, Star, StarFilled } from "fa-icons";
import type { Key } from "react-aria";
import { SiteFooter } from "@/components/application/site-footer/site-footer";
import type { SiteNavItem } from "@/components/application/site-header/site-brands";
import { SiteHeader } from "@/components/application/site-header/site-header";
import type { TickerItem } from "@/components/application/site-header/ticker-bar";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { getInitials } from "@/components/base/avatar/utils";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { SocialButton } from "@/components/base/buttons/social-button";
import { TextArea } from "@/components/base/textarea/textarea";
import { cx } from "@/utils/cx";

/* -------------------------------------------------------------------------------------------------
 * Data (placeholder where marked; see 02-pluss-artikkel.notes.md)
 * -----------------------------------------------------------------------------------------------*/

const ticker: TickerItem[] = [
    { label: "Oslo Børs", value: "1 712,48", change: "0,42%", direction: "up", href: "/ticker/OSEBX" },
    { label: "Brent spot", value: "64,18", change: "-0,87%", direction: "down", href: "/ticker/Brent%20Spot%3DF" },
    { label: "Dollar", value: "10,08", change: "0,12%", direction: "up", href: "/ticker/USDNOK" },
    { label: "Euro", value: "11,71", change: "-0,05%", direction: "down", href: "/ticker/EURNOK" },
    { label: "BRUT", value: "57,00", change: "-1,04%", direction: "down", href: "/ticker/BRUT" },
];

const navigation: SiteNavItem[][] = [
    [
        { label: "Siste nytt", href: "/siste" },
        { label: "MittFa", href: "/mittfa" },
    ],
    [
        { label: "Børs", href: "/bors" },
        { label: "Shipping", href: "/shipping", current: true },
        { label: "Makro", href: "/makro" },
        { label: "Eiendom", href: "/eiendom" },
        { label: "Forum", href: "/forum" },
        { label: "Bjellesauer", href: "/bjellesauer" },
    ],
];

const shortcuts: SiteNavItem[] = [
    { label: "Siste", href: "/siste" },
    { label: "Børs", href: "/bors" },
    { label: "Shipping", href: "/shipping", current: true },
    { label: "Forum", href: "/forum" },
];

type Period = "1d" | "1u" | "1m" | "6m" | "1aa" | "5aa";

const periodLabels: Record<Period, string> = { "1d": "1D", "1u": "1U", "1m": "1M", "6m": "6M", "1aa": "1Å", "5aa": "5Å" };

interface Stock {
    name: string;
    ticker: string;
    href: string;
    price: number;
    currency: string;
    updated: string;
    returns: Record<Period, number>;
}

const bruton: Stock = {
    name: "Bruton",
    ticker: "BRUT",
    href: "/aksje/BRUT",
    price: 57,
    currency: "NOK",
    updated: "11:52",
    // 1D from the brief; the other periods are placeholders.
    returns: { "1d": -1.04, "1u": -3.81, "1m": -9.12, "6m": 14.6, "1aa": 31.25, "5aa": 182.4 },
};

const insw: Stock = {
    name: "International Seaways",
    ticker: "INSW.US",
    href: "/aksje/INSW.US",
    price: 113.7,
    currency: "USD",
    updated: "11:52",
    // 1D from the brief; the other periods are placeholders.
    returns: { "1d": 2.64, "1u": 4.1, "1m": 7.85, "6m": 18.3, "1aa": 22.9, "5aa": 512.7 },
};

const nok2 = new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Change value (no component yet): signed, colored by direction, Norwegian format. */
const ChangeValue = ({ value, className }: { value: number; className?: string }) => (
    <span className={cx("tabular-nums", value > 0 && "text-success-primary", value < 0 && "text-error-primary", value === 0 && "text-tertiary", className)}>
        {new Intl.NumberFormat("nb-NO", { style: "percent", minimumFractionDigits: 2, signDisplay: "exceptZero" }).format(value / 100)}
    </span>
);

/* -------------------------------------------------------------------------------------------------
 * Small building blocks (stand-ins for patterns without a component)
 * -----------------------------------------------------------------------------------------------*/

const inset = "rounded-2xl bg-tertiary p-4";

/** Follow chip stand-in: secondary sm Button, avatar leading, star trailing, aria-pressed. */
const FollowChip = ({ label, avatar, defaultFollowing = false }: { label: string; avatar?: ReactNode; defaultFollowing?: boolean }) => {
    const [following, setFollowing] = useState(defaultFollowing);
    return (
        <Button
            color="secondary"
            size="sm"
            aria-pressed={following}
            aria-label={following ? `Følger ${label} i MittFa` : `Følg ${label} i MittFa`}
            iconLeading={avatar}
            iconTrailing={following ? StarFilled : Star}
            onPress={() => setFollowing((f) => !f)}
        >
            {label}
        </Button>
    );
};

const TickerBadge = ({ stock }: { stock: Stock }) => (
    <a href={stock.href} className="rounded-full outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
        <Badge color="brand" size="sm" type="pill-color">
            {stock.ticker}
        </Badge>
    </a>
);

/** Live price inset for a company mentioned in the article. */
const StockInset = ({ stock }: { stock: Stock }) => {
    const [period, setPeriod] = useState<Set<Key>>(new Set(["1d"]));
    const selected = ([...period][0] ?? "1d") as Period;

    return (
        <section aria-label={`Kurs for ${stock.name}`} className={cx(inset, "not-prose my-6 flex flex-col gap-4")}>
            <header className="flex items-start gap-3">
                <Avatar size="md" rounded={false} initials={stock.ticker.slice(0, 2)} />
                <div className="min-w-0 flex-1">
                    <a
                        href={stock.href}
                        className="text-md font-semibold text-primary outline-focus-ring transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        {stock.name}
                    </a>
                    <div className="mt-0.5 flex items-center gap-2">
                        <TickerBadge stock={stock} />
                        <BadgeWithDot color="error" size="sm" type="pill-color">
                            Live
                        </BadgeWithDot>
                        <span className="text-xs text-tertiary">{stock.updated}</span>
                    </div>
                </div>
                <ButtonUtility icon={ArrowRight} href={stock.href} tooltip={`Åpne aksjesiden for ${stock.name}`} />
            </header>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-display-xs font-semibold text-primary tabular-nums">
                    {nok2.format(stock.price)} <span className="text-sm font-medium text-tertiary">{stock.currency}</span>
                </p>
                <p className="text-sm font-medium">
                    <span className="text-tertiary">Avkastning {periodLabels[selected]}: </span>
                    <ChangeValue value={stock.returns[selected]} />
                </p>
            </div>

            <ButtonGroup aria-label="Periode for avkastning" size="sm" selectedKeys={period} onSelectionChange={setPeriod} disallowEmptySelection>
                {(Object.keys(periodLabels) as Period[]).map((p) => (
                    <ButtonGroupItem key={p} id={p}>
                        {periodLabels[p]}
                    </ButtonGroupItem>
                ))}
            </ButtonGroup>

            <div className="flex flex-wrap items-center gap-2">
                <FollowChip label={`${stock.name} (${stock.ticker})`} />
            </div>
        </section>
    );
};

/** Key figures (no component yet): label over value. */
const KeyFigure = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="flex flex-col gap-0.5">
        <dt className="text-xs font-medium text-tertiary">{label}</dt>
        <dd className="text-lg font-semibold text-primary tabular-nums">{children}</dd>
    </div>
);

const InvestorInset = () => (
    <section aria-label="Investorprofil" className={cx(inset, "not-prose my-6 flex flex-col gap-4")}>
        <div className="flex items-center gap-3">
            <AvatarLabelGroup size="md" alt="" initials={getInitials("Andreas Wold Hofstad")} title="Andreas Wold Hofstad" subtitle="Investor · 31 år" />
            <FollowChip label="Andreas Wold Hofstad" />
        </div>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <KeyFigure label="Beholdning">22,06 M NOK</KeyFigure>
            <KeyFigure label="Antall aksjer">6</KeyFigure>
            <KeyFigure label="Største investering">
                <a href="/aksje/LUMI" className="rounded-full outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                    <Badge color="brand" size="md" type="pill-color">
                        LUMI
                    </Badge>
                </a>
            </KeyFigure>
            <KeyFigure label="Kjøpt siste 12 mnd">41,39 M</KeyFigure>
            <KeyFigure label="Solgt siste 12 mnd">25,31 M</KeyFigure>
        </dl>
        <Button href="/bjellesauer/andreas-wold-hofstad" color="link-color" iconTrailing={ArrowRight} className="self-start">
            Se investorprofil
        </Button>
    </section>
);

/** Article teaser (no component yet), compact horizontal version. */
const Teaser = ({ kicker, title, href, pluss }: { kicker?: string; title: string; href: string; pluss?: boolean }) => (
    <li className="flex items-start gap-3 border-b border-secondary py-3 last:border-b-0">
        <div aria-hidden className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-quaternary">
            <ImageIcon className="size-5 text-fg-quaternary" />
        </div>
        <div className="min-w-0 flex-1">
            <a
                href={href}
                className="text-md font-bold text-primary outline-focus-ring transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                {kicker && <span className="text-brand-secondary">{kicker} </span>}
                {title}
            </a>
            {pluss && (
                <div className="mt-1">
                    <BadgeWithIcon color="brand" size="sm" type="pill-color" iconLeading={Lock}>
                        Pluss
                    </BadgeWithIcon>
                </div>
            )}
        </div>
        <ButtonUtility icon={Plus} size="xs" color="tertiary" tooltip="Lagre i MittFa" />
    </li>
);

/* -------------------------------------------------------------------------------------------------
 * Article sections
 * -----------------------------------------------------------------------------------------------*/

const ArticleHeader = () => (
    <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
            <BadgeWithIcon color="brand" size="md" type="pill-color" iconLeading={Lock}>
                Pluss
            </BadgeWithIcon>
            <a
                href="/shipping"
                className="text-sm font-semibold text-brand-secondary outline-focus-ring transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                Shipping
            </a>
        </div>
        <h1 className="text-display-sm font-bold text-primary md:text-display-lg">
            <span className="text-brand-secondary">Andreas Wold Hofstad (31):</span> Shorter shippingaksje for 25 millioner
        </h1>
        <p className="text-lg font-medium text-tertiary md:text-display-xs">
            Den unge investoren har lånt og solgt Bruton-aksjer for rundt 25 millioner kroner, og satser samtidig på at amerikanske International Seaways
            stiger. Han mener tankmarkedet er i ferd med å snu.
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="text-xs font-medium text-tertiary">
                Publisert <time dateTime="2026-10-27T11:39">11:39</time>
            </p>
            <Button color="tertiary" size="sm" iconLeading={Plus}>
                Lagre i MittFa
            </Button>
        </div>
    </header>
);

const ArticlePhoto = () => (
    <figure className="flex flex-col gap-2">
        {/* Placeholder: replace with the article photo. */}
        <div
            role="img"
            aria-label="Andreas Wold Hofstad på kontoret i Oslo"
            className="flex aspect-[3/2] w-full items-center justify-center rounded-2xl bg-tertiary"
        >
            <ImageIcon className="size-6 text-fg-quaternary" />
        </div>
        <figcaption className="text-sm text-tertiary">
            Andreas Wold Hofstad har bygget opp en portefølje på over 22 millioner kroner. FOTO: Per Ståle Bugjerde
        </figcaption>
    </figure>
);

const Byline = () => (
    <div className="flex flex-col gap-3 border-y border-secondary py-4 sm:flex-row sm:items-center">
        <AvatarLabelGroup size="md" alt="" initials={getInitials("Eivind Aakre")} title="Eivind Aakre" subtitle="Journalist" />
        <div className="flex flex-wrap items-center gap-2">
            <Button color="secondary" size="sm" iconLeading={Mail} href="mailto:tips@finansavisen.no?subject=Tips%20til%20Eivind%20Aakre">
                Tips meg
            </Button>
            <ButtonUtility icon={LinkIcon} tooltip="Kopier lenke" />
            <ButtonUtility icon={Share} tooltip="Del artikkelen" />
            <SocialButton social="facebook" size="md" aria-label="Del på Facebook" href="https://www.facebook.com/sharer/sharer.php" />
            <SocialButton social="twitter" size="md" aria-label="Del på X" href="https://x.com/intent/post" />
        </div>
    </div>
);

const Opening = () => (
    <>
        <p>
            I helgen fikk Andreas Wold Hofstad det endelige svaret fra meglerhuset: Shortposisjonen hans i shippingselskapet Bruton er nå på rundt 25 millioner
            kroner, ifølge oversikten over korte posisjoner fra Finanstilsynet.
        </p>
        <p>– Jeg tror markedet har priset inn en tankrate som ikke kommer til å holde gjennom vinteren, sier Hofstad til Finansavisen.</p>
    </>
);

const Body = () => (
    <>
        <p>
            Bruton-aksjen har steget over 30 prosent det siste året, og falt over én prosent tirsdag formiddag. Hofstad har brukt mye av høsten på å gå gjennom
            flåtelistene og kontraktene til selskapet.
        </p>

        <StockInset stock={bruton} />

        <h2 className="text-xl font-bold">Satser på amerikansk rival</h2>
        <p>
            Samtidig som han shorter Bruton, har Hofstad kjøpt seg opp i New York-noterte International Seaways. Der mener han at rateutviklingen allerede er
            bedre enn analytikerne regner med.
        </p>
        <p>– Det er ikke et veddemål mot tankmarkedet som helhet. Det er et veddemål på at noen skip er bedre posisjonert enn andre, sier han.</p>

        <StockInset stock={insw} />

        <h2 className="text-xl font-bold">«Ikke opplevd før»</h2>
        <p>Hofstad startet med aksjer som 19-åring, og har ifølge aksjonærregisteret i dag seks posisjoner på Oslo Børs. Den største er i Lumi Gruppen.</p>
        <p>
            <strong>
                – Jeg har aldri hatt en så stor posisjon mot ett enkelt selskap. Det er ikke noe jeg har opplevd før, og jeg sover ikke like godt, innrømmer
                han.
            </strong>
        </p>

        <InvestorInset />

        <h2 className="text-xl font-bold">Bruton avviser kritikken</h2>
        <p>
            Finansdirektøren i Bruton ønsker ikke å kommentere enkeltinvestorers posisjoner, men viser til at selskapet har sikret over 70 prosent av
            inntjeningsdagene for neste år.
        </p>
        <p>– Vi har en sterk balanse og en ung flåte. Markedet får dømme selv, sier han.</p>
    </>
);

const FollowCard = () => (
    <section aria-labelledby="follow-heading" className={cx(inset, "flex flex-col gap-3")}>
        <h2 id="follow-heading" className="text-md font-semibold text-primary">
            Legg til i MittFa
        </h2>
        <p className="text-sm text-tertiary">Få varsel når det kommer nye saker om temaene i artikkelen.</p>
        <div className="flex flex-wrap gap-2">
            <FollowChip label="Andreas Wold Hofstad" avatar={<Avatar size="xs" initials="AH" />} />
            <FollowChip label="Bruton (BRUT)" avatar={<Avatar size="xs" rounded={false} initials="BR" />} />
            <FollowChip label="International Seaways (INSW.US)" avatar={<Avatar size="xs" rounded={false} initials="IN" />} />
            <FollowChip label="Shipping" />
            <FollowChip label="Eivind Aakre" avatar={<Avatar size="xs" initials="EA" />} />
        </div>
    </section>
);

const RelatedStory = () => (
    <section aria-labelledby="related-heading" className={cx(inset, "flex flex-col gap-1")}>
        <h2 id="related-heading" className="text-xs font-medium text-tertiary">
            Relatert
        </h2>
        <ul>
            <Teaser kicker="Shortsalg:" title="Disse aksjene er mest shortet på Oslo Børs akkurat nå" href="/bors/mest-shortet-oslo-bors" pluss />
        </ul>
    </section>
);

const AiNote = () => (
    <aside aria-label="Om bruk av KI" className={cx(inset, "flex gap-3")}>
        <Ai className="size-5 shrink-0 text-fg-quaternary" />
        <p className="text-sm text-tertiary">
            Faktaboksene med kurser og investorprofil er hentet automatisk fra Finansavisens børsdata. Teksten er skrevet og kontrollert av journalist.{" "}
            <a href="/ki" className="font-medium text-secondary underline outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                Slik bruker vi KI
            </a>
        </p>
    </aside>
);

const comments = [
    { name: "Kristin Haugland", time: "12:04", text: "Modig posisjon. BRUT har jo levert over forventning tre kvartaler på rad." },
    { name: "Ole Martin Eide", time: "11:58", text: "Interessant at han samtidig går long INSW. Ren parhandel på rater, slik jeg leser det." },
];

const Comments = ({ isSubscriber }: { isSubscriber: boolean }) => {
    const [text, setText] = useState("");
    return (
        <section aria-labelledby="comments-heading" className={cx(inset, "flex flex-col gap-4")}>
            <h2 id="comments-heading" className="flex items-center gap-2 text-md font-semibold text-primary">
                <Chat className="size-5 text-fg-quaternary" />
                Kommentarer <span className="text-sm font-normal text-tertiary">(14)</span>
            </h2>
            {isSubscriber ? (
                <div className="flex flex-col gap-3">
                    <TextArea label="Skriv en kommentar" rows={3} maxLength={1000} value={text} onChange={setText} hint={`${text.length} av 1000 tegn`} />
                    <Button size="sm" className="self-start" isDisabled={text.trim().length === 0}>
                        Publiser kommentar
                    </Button>
                </div>
            ) : (
                <p className="text-sm text-tertiary">Logg inn som abonnent for å kommentere.</p>
            )}
            <ul className="flex flex-col">
                {comments.map((c) => (
                    <li key={c.name} className="flex flex-col gap-2 border-b border-secondary py-3 last:border-b-0">
                        <AvatarLabelGroup size="sm" alt="" initials={getInitials(c.name)} title={c.name} subtitle={`I dag ${c.time}`} />
                        <p className="text-sm text-tertiary">{c.text}</p>
                    </li>
                ))}
            </ul>
            <Button href="#kommentarer" color="link-color" className="self-start">
                Vis alle 14 kommentarer
            </Button>
        </section>
    );
};

const FurtherReading = () => (
    <section aria-labelledby="more-heading" className="flex flex-col gap-2">
        <h2 id="more-heading" className="text-xl font-bold text-primary">
            Les mer
        </h2>
        <ul>
            <Teaser kicker="Tankrater:" title="VLCC-ratene har doblet seg på en måned" href="/shipping/vlcc-rater" />
            <Teaser title="Analytikerne kutter kursmålet på Bruton etter svakt tredjekvartal" href="/shipping/bruton-kursmal" pluss />
            <Teaser kicker="Bjellesauer:" title="Her er de unge investorene som tjente mest på Oslo Børs i år" href="/bjellesauer/unge-investorer" pluss />
        </ul>
    </section>
);

/** Paywall box (no component yet). */
const Paywall = () => (
    <section
        aria-labelledby="paywall-heading"
        className="not-prose mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-secondary bg-primary_alt p-6 text-center"
    >
        <Lock aria-label="Pluss-artikkel" className="size-6 text-fg-brand-primary" />
        <h2 id="paywall-heading" className="text-display-xs font-semibold text-primary">
            Bli abonnent fra 99 kr
        </h2>
        <p className="text-sm text-tertiary">Første måned 99 kr, deretter 499 kr per måned. Ingen bindingstid.</p>
        <div className="flex w-full flex-col gap-3">
            <SocialButton social="google" className="w-full">
                Fortsett med Google
            </SocialButton>
            <SocialButton social="apple" className="w-full">
                Fortsett med Apple
            </SocialButton>
            <Button color="secondary" size="lg" iconLeading={Mail} className="w-full">
                Fortsett med e-post
            </Button>
        </div>
        <p className="text-sm text-tertiary">
            Har du allerede en konto?{" "}
            <Button href="/logg-inn" color="link-color" size="sm">
                Logg inn
            </Button>
        </p>
    </section>
);

/** Desktop rail: compact live prices alongside the text, and the ad slot (never inside the text). */
const Rail = () => (
    <aside aria-label="Aksjer i saken" className="hidden flex-col gap-6 lg:flex">
        <div className="sticky top-6 flex flex-col gap-6">
            <section className="rounded-2xl border border-secondary bg-primary_alt p-4">
                <h2 className="mb-2 text-lg font-semibold text-primary">Aksjer i saken</h2>
                <ul>
                    {[bruton, insw].map((s) => (
                        <li key={s.ticker} className="flex items-center justify-between gap-3 border-b border-secondary py-2.5 last:border-b-0">
                            <div className="min-w-0">
                                <a
                                    href={s.href}
                                    className="block truncate text-sm font-medium text-primary outline-focus-ring transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    {s.name}
                                </a>
                                <p className="text-xs text-tertiary">{s.ticker}</p>
                            </div>
                            <div className="text-right text-sm">
                                <p className="font-semibold text-primary tabular-nums">{nok2.format(s.price)}</p>
                                <ChangeValue value={s.returns["1d"]} className="text-xs font-medium" />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            {/* Ad slot placeholder: sits beside the text, never between paragraphs. */}
            <div className="flex h-60 flex-col items-center justify-center gap-1 rounded-2xl border border-secondary bg-secondary">
                <span className="text-xs font-medium text-quaternary">Annonse</span>
            </div>
        </div>
    </aside>
);

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

export interface PlussArtikkelProps {
    /** Signed-in subscriber sees the whole article; otherwise headline, ingress and opening, then the paywall. */
    isSubscriber?: boolean;
}

export const PlussArtikkel = ({ isSubscriber = true }: PlussArtikkelProps) => (
    <div className="min-h-dvh bg-primary_alt">
        <SiteHeader
            brand="fa"
            navigation={navigation}
            shortcuts={shortcuts}
            tickerItems={ticker}
            user={isSubscriber ? { initials: "KH", href: "/min-side" } : undefined}
            loginHref="/logg-inn"
            subscribeHref="/abonnement"
            onSearchPress={() => {}}
        />

        <main className="mx-auto w-full max-w-container px-4 py-6 md:px-8 md:py-10">
            <article className="mx-auto flex max-w-5xl flex-col gap-6">
                <ArticleHeader />
                <ArticlePhoto />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
                        <Byline />

                        <div className="prose max-w-none">
                            <Opening />
                            {isSubscriber && <Body />}
                        </div>

                        {isSubscriber ? (
                            <>
                                <FollowCard />
                                <RelatedStory />
                                <AiNote />
                                <Comments isSubscriber />
                                <FurtherReading />
                            </>
                        ) : (
                            <>
                                <Paywall />
                                <FurtherReading />
                            </>
                        )}
                    </div>

                    <Rail />
                </div>
            </article>
        </main>

        <SiteFooter
            brand="fa"
            links={[
                [
                    { label: "eAvis", href: "/eavis" },
                    { label: "Abonnement", href: "/abonnement" },
                    { label: "Annonse", href: "/annonse" },
                ],
                [
                    { label: "Personvernerklæring", href: "/personvern" },
                    { label: "Vilkår", href: "/vilkar" },
                    { label: "Samtykkeinnstillinger", href: "/samtykke" },
                ],
            ]}
            publisherInfo={["Utgis av Hegnar Media AS", "Ansvarlig redaktør: Trygve Hegnar", "Hoffsveien 70 A, 0214 Oslo"]}
            copyright="©2026 Hegnar Media AS"
            disclaimer="Børsdata levert av Millistream. Kurser kan være forsinket."
            disclaimerHref="/om-data"
            socialLinks={[
                { platform: "facebook", href: "https://www.facebook.com/finansavisen" },
                { platform: "x", href: "https://x.com/finansavisen" },
                { platform: "linkedin", href: "https://www.linkedin.com/company/finansavisen" },
            ]}
            contactHref="/kontakt-oss"
            appStoreHref="https://apps.apple.com/no/app/finansavisen"
            googlePlayHref="https://play.google.com/store/apps/details?id=no.finansavisen"
        />
    </div>
);

export default PlussArtikkel;
