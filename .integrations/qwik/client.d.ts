declare global {
    interface Window {
        /** Event names queued for the qwikloader, or the loader once installed. */
        _qwikEv?: {
            roots: Set<Node>;
        } | unknown[];
    }
}
/** Holds the slot content, which Astro's island runtime hands over only once. */
declare const SLOTS: unique symbol;
/** Tears down the previous render, so a props update can replace it. */
declare const CLEANUP: unique symbol;
type IslandElement = {
    [CLEANUP]?: () => void;
    [SLOTS]?: Record<string, string>;
} & HTMLElement;
declare const client_default: (element: IslandElement) => (Component: unknown, props: Record<string, unknown>, slotted: Record<string, string>, { client }: {
    client: string;
}) => Promise<void>;
export default client_default;
//# sourceMappingURL=client.d.ts.map