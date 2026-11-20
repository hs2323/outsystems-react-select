import type { AstroIntegration, AstroRenderer } from "astro";
export declare const getContainerRenderer: () => AstroRenderer;
export interface LoaderOptions {
    exclude?: string[];
    include?: string[];
    /**
     * Compiles with Marko's optimized runtime. Defaults to Vite's production
     * mode, so development gets the debug runtime and its warnings.
     */
    optimize?: boolean;
}
export interface Options {
    exclude?: string[];
    include?: string[];
}
interface VirtualFile {
    code: string;
    map?: unknown;
}
/**
 * Compiles `.marko` files to Marko's DOM output. Runs before Vite's other
 * transforms, which do not understand Marko syntax.
 *
 * The same output is used on the server, where the renderer only imports the
 * template to identify it: Marko's DOM runtime does not touch the DOM until a
 * template is mounted. A `<style>` block is split out by the compiler as a
 * virtual CSS module, which the loader serves so Vite bundles it with the
 * page's other CSS.
 */
export declare function markoLoader(options?: LoaderOptions): {
    configResolved(config: {
        isProduction: boolean;
    }): void;
    enforce: "pre";
    load(id: string): VirtualFile | undefined;
    name: string;
    transform(this: {
        addWatchFile?: (id: string) => void;
    }, code: string, id: string): Promise<{
        code: string;
        map: unknown;
    } | undefined>;
};
export default function (options?: Options): AstroIntegration;
export {};
//# sourceMappingURL=index.d.ts.map