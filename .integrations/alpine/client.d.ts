import type { Alpine as AlpineType } from "alpinejs";
/** The reactive props object Alpine sees as the island's scope. */
declare const PROPS: unique symbol;
type IslandElement = {
    [PROPS]?: Record<string, unknown>;
} & HTMLElement;
declare global {
    interface Window {
        Alpine?: AlpineType;
    }
}
declare const client_default: (element: IslandElement) => (Component: unknown, props: Record<string, unknown>, slotted: Record<string, string>) => void;
export default client_default;
//# sourceMappingURL=client.d.ts.map