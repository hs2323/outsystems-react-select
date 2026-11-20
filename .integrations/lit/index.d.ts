import type { AstroIntegration, AstroRenderer } from "astro";
export declare const getContainerRenderer: () => AstroRenderer;
export interface Options {
    exclude?: string[];
    include?: string[];
}
export default function (options?: Options): AstroIntegration;
//# sourceMappingURL=index.d.ts.map