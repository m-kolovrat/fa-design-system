import { Fragment, type ReactNode, createElement } from "react";

/**
 * The library's built-in texts, in Norwegian (bokmål): accessible names, button labels and empty
 * texts that components show when you don't pass your own. One place to review the wording.
 *
 * Components read their group from here and take a prop to override a text per use: a single
 * text through its own prop (`CloseButton` `label`, `Alert` `closeLabel`), a group through
 * `labels` (`<PaginationPageDefault labels={{ previous: "Tilbake" }} />`). There is no provider:
 * to change a text everywhere, change it here.
 */
export const strings = {
    /** `CloseButton`, and the close buttons in `Alert`, `Notification`, modals and the slideout menu. */
    close: "Lukk",
    /** `LoadingIndicator` without a `label`. */
    loading: "Laster",

    pagination: {
        /** The `<nav>` around the pages. */
        navigation: "Sidenavigasjon",
        /** The visible prev / next text (desktop). */
        previous: "Forrige",
        next: "Neste",
        /** Accessible names of the prev / next / first / last buttons. */
        previousPage: "Forrige side",
        nextPage: "Neste side",
        firstPage: "Første side",
        lastPage: "Siste side",
        /** Accessible name of a page number. */
        page: (page: number) => `Side ${page}`,
        /** "Side 3 av 10"; `page` and `total` arrive already styled. */
        pageOf: (page: ReactNode, total: ReactNode): ReactNode => createElement(Fragment, null, "Side ", page, " av ", total),
        /** The page number input in `PaginationCardAdvanced`. */
        pageInput: "Gå til side",
        /** The page-size select's visible label and accessible name. */
        rowsPerPage: "Rader per side",
        pageSize: "Antall per side",
    },

    carousel: {
        previous: "Forrige lysbilde",
        next: "Neste lysbilde",
        goTo: (slide: number) => `Gå til lysbilde ${slide}`,
    },

    datePicker: {
        /** The picker's accessible name when there is no `label`. */
        date: "Velg dato",
        range: "Velg periode",
        /** Trigger text with no value. */
        empty: "Velg dato",
        emptyRange: "Velg datoer",
        cancel: "Avbryt",
        apply: "Bruk",
        /** `Calendar`'s button and its date input's name. */
        today: "I dag",
        dateInput: "Dato",
        /** `DateRangePicker` presets. */
        presets: {
            today: "I dag",
            yesterday: "I går",
            thisWeek: "Denne uken",
            lastWeek: "Forrige uke",
            thisMonth: "Denne måneden",
            lastMonth: "Forrige måned",
            thisYear: "I år",
            lastYear: "I fjor",
            allTime: "Hele perioden",
        },
    },

    fileUpload: {
        /** The drop zone's button: the short desktop text and the mobile text (no drag and drop there). */
        upload: "Klikk for å laste opp",
        uploadMobile: "Klikk for å laste opp filer",
        dragAndDrop: "eller dra og slipp",
        uploading: "Laster opp …",
        complete: "Fullført",
        failed: "Mislyktes",
        failedRetry: "Opplastingen mislyktes, prøv igjen",
        tryAgain: "Prøv igjen",
        delete: "Slett",
    },

    select: {
        placeholder: "Velg",
        searchPlaceholder: "Søk",
    },

    multiSelect: {
        placeholder: "Velg",
        search: "Søk",
        /** The list's accessible name when there is no `label`. */
        options: "Alternativer",
        selectedCount: (count: number) => `${count} valgt`,
        reset: "Nullstill",
        selectAll: "Velg alle",
        noResults: "Ingen treff",
        noResultsDescription: "Prøv et annet søkeord.",
        clearSearch: "Tøm søket",
    },

    input: {
        togglePassword: "Vis eller skjul passord",
        /** `InputFile`. */
        fileButton: "Last opp",
        filePlaceholder: "Velg en fil",
        /** The tag list's accessible name in `InputTags` without a `label`. */
        tags: "Stikkord",
    },

    /** `Tag`'s × button. The tag text next to it gives the context. */
    removeTag: "Fjern",
    /** `AvatarAddButton`'s tooltip and name. */
    addUser: "Legg til bruker",
    /** `PinInput` without a `PinInput.Label`. */
    pinInput: "Skriv inn koden",
    /** `Dropdown.DotsButton` without an `aria-label`. */
    openMenu: "Flere valg",
    /** `SlideoutMenu` without `aria-label` / `aria-labelledby`. */
    slideoutMenu: "Sidepanel",

    breadcrumbs: {
        navigation: "Brødsmulesti",
        showAll: "Vis hele stien",
    },
};

export type Strings = typeof strings;

/** A date picker's `labels` prop: any of its texts, and any of the presets. */
export type DatePickerLabels = Partial<Omit<Strings["datePicker"], "presets">> & { presets?: Partial<Strings["datePicker"]["presets"]> };

/** `strings.datePicker` with a `labels` prop merged in. */
export const mergeDatePickerLabels = (labels?: DatePickerLabels): Strings["datePicker"] => ({
    ...strings.datePicker,
    ...labels,
    presets: { ...strings.datePicker.presets, ...labels?.presets },
});
