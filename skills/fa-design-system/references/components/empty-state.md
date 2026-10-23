# Empty state and error state

A centered block with a featured icon, a title, a short explanation and up to two actions, shown
where content would be. `EmptyState` (gray icon) when there is nothing to show yet; `ErrorState`
(red icon) when loading it failed. One size. Figma: States → Empty state, Error state.

```ts
import { EmptyState, ErrorState } from "fa-design-system/components/application/empty-state/empty-state";
```

## Use when

- **EmptyState**: an empty watchlist, no saved articles, no search results, no alerts set up.
- **ErrorState**: a list, table or widget couldn't load ("Vi fikk ikke hentet kursene").

## Use something else when

- The whole page or account needs attention, or the content loaded but something about it is wrong:
  `Alert`.
- The content is on its way: `LoadingIndicator` (or a skeleton), not an empty state.
- A failed action the reader just took: `notify({ type: "error" })`.

## Rules

- **empty-state-choose** MUST Use `ErrorState` only for failures and `EmptyState` only for real
  emptiness. Never show `EmptyState` when a request failed. Because "Ingen aksjer i listen" after a
  failed load tells the reader their data is gone.
- **empty-state-icon** MUST Pass an `icon` that fits (`Star` for favorites, `Search` for no hits,
  `Bell` for alerts, `Alert` for errors). Because the default is a check mark (`Success`), which
  reads as "done".
- **empty-state-next-step** SHOULD Tell the reader what to do next in `description`, and offer it as
  `primaryAction` ("Legg til aksje", "Prøv igjen"). Because an empty state is a starting point.
- **empty-state-actions** MUST Pass actions as `Button size="md"`: `primaryAction` the default
  color, `secondaryAction` `color="secondary"`. Because those are the Figma buttons; the secondary
  is placed first, on the left.
- **empty-state-search-term** SHOULD Repeat the search term in a no-results title ("Ingen treff på
  «Equinr»") and offer to clear the search.
- **empty-state-heading-level** SHOULD Place it where an `h3` fits in the outline; the title is
  always an `h3`.
- **empty-state-in-table** SHOULD Inside a `Table`, render it from `Table.Body`'s `renderEmptyState`
  (React Aria) rather than replacing the table, so the headers stay.

## Props

| Prop              | Values                                             | Default   |
| :---------------- | :------------------------------------------------- | :-------- |
| `title`           | ReactNode (required)                               |           |
| `description`     | ReactNode                                          |           |
| `icon`            | icon component                                     | `Success` |
| `showIcon`        | boolean                                            | `true`    |
| `primaryAction`   | ReactNode (`<Button size="md">`)                   |           |
| `secondaryAction` | ReactNode (`<Button size="md" color="secondary">`) |           |

Plus `div` attributes (`className` for spacing, e.g. `py-12`). Max width 512px, centered.

## Accessibility

- When an `ErrorState` replaces content after a failed request, wrap it in an element with
  `role="alert"` (or move focus to "Prøv igjen") so the failure is announced; the component itself
  has no live role.
- `EmptyState` needs no role.

## Example

```tsx
{
    status === "error" ? (
        <div role="alert">
            <ErrorState
                icon={Alert}
                title="Vi fikk ikke hentet kursene"
                description="Det kan skyldes et midlertidig brudd hos Oslo Børs. Prøv igjen om litt."
                primaryAction={
                    <Button size="md" iconLeading={Restart} onPress={refetch}>
                        Prøv igjen
                    </Button>
                }
            />
        </div>
    ) : watchlist.length === 0 ? (
        <EmptyState
            icon={Star}
            title="Du følger ingen aksjer ennå"
            description="Legg til aksjer som EQNR eller DNB for å se kurs og nyheter her."
            secondaryAction={
                <Button size="md" color="secondary" href="/bors">
                    Se Oslo Børs
                </Button>
            }
            primaryAction={
                <Button size="md" iconLeading={Plus} onPress={openSearch}>
                    Legg til aksje
                </Button>
            }
            className="py-12"
        />
    ) : (
        <Watchlist items={watchlist} />
    );
}
```

## See also

Storybook: Application / Empty states. Related: [alert](alert.md), [table](table.md),
[loading-indicator](loading-indicator.md), [featured-icon](featured-icon.md).
