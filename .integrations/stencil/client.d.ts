/** The Stencil element rendered into the island. */
declare const ELEMENT: unique symbol;
/** The props last set on that element. */
declare const PROPS: unique symbol;
type IslandElement = {
    [ELEMENT]?: HTMLElement;
    [PROPS]?: Record<string, unknown>;
} & HTMLElement;
declare const client_default: (element: IslandElement) => (Component: unknown, props: Record<string, unknown>, slotted: Record<string, string>) => void;
export default client_default;
//# sourceMappingURL=client.d.ts.map