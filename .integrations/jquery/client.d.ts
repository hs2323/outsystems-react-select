declare global {
    interface Window {
        jQuery?: JQueryStatic;
    }
}
declare const client_default: (element: HTMLElement) => (Component: unknown, props: Record<string, unknown>) => void;
export default client_default;
//# sourceMappingURL=client.d.ts.map