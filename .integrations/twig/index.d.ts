import type { AstroIntegration, AstroRenderer } from "astro";
export declare const getContainerRenderer: () => AstroRenderer;
export interface LoaderOptions {
    assets?: string;
    namespaces?: Record<string, string>;
    root?: string;
}
export interface Options {
    assets?: string;
    exclude?: string[];
    include?: string[];
    namespaces?: Record<string, string>;
}
export declare function twigLoader(options?: LoaderOptions): {
    enforce: "pre";
    load(this: {
        addWatchFile?: (id: string) => void;
    }, id: string): {
        code: string;
        map: null;
    } | undefined;
    name: string;
};
export default function (options?: Options): AstroIntegration;
//# sourceMappingURL=index.d.ts.map