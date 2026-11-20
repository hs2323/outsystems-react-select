import type { AstroIntegration, AstroRenderer } from "astro";
export declare const getContainerRenderer: () => AstroRenderer;
export interface LoaderOptions {
    exclude?: string[];
    include?: string[];
}
export interface Options {
    exclude?: string[];
    include?: string[];
}
/**
 * Compiles Stencil component modules. Runs before Vite's own TypeScript
 * transform, which does not understand Stencil's decorators.
 *
 * Each component is exported as a custom element class (Stencil's `module`
 * output). Stencil components are usually named exports, but the OutSystems
 * Islands module loads an island's default export, so a component may be
 * written as `export default class`: Stencil mangles that form, so it is
 * compiled as a named export and the default export is added back after. The
 * class is registered under the tag from its `@Component` decorator when
 * the module is imported in the browser, so a component can render another
 * one by importing it. Registration is skipped on the server, where the
 * renderer only imports the module to identify the component.
 */
export declare function stencilLoader(options?: LoaderOptions): {
    enforce: "pre";
    name: string;
    transform(this: {
        warn?: (message: string) => void;
    }, code: string, id: string): Promise<{
        code: string;
        map: any;
    } | undefined>;
};
export default function (options?: Options): AstroIntegration;
//# sourceMappingURL=index.d.ts.map