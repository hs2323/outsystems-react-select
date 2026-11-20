/** The Marko template instance mounted in the island. */
declare const INSTANCE: unique symbol;
type IslandElement = {
    [INSTANCE]?: MountedTemplate;
} & HTMLElement;
/** What `template.mount` returns. */
interface MountedTemplate {
    destroy(): void;
    update(input: Record<string, unknown>): void;
}
declare const client_default: (element: IslandElement) => (Component: unknown, props: Record<string, unknown>) => void;
export default client_default;
//# sourceMappingURL=client.d.ts.map