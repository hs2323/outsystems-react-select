import type { AstroIntegration } from "astro";
/**
 * Gives the Qwik renderer a client entrypoint, and moves its client build into
 * Astro's assets directory.
 *
 * `@qwik.dev/astro` registers a renderer with a `serverEntrypoint` only. Astro
 * adds `renderer-url`, `component-export` and the serialized `props` attribute
 * to an island only when its renderer has a `clientEntrypoint`, so without one
 * the island is emitted as an inert wrapper: props never reach the component,
 * and an island that arrives without server-rendered markup inside it has
 * nothing to resume and stays empty.
 *
 * It also emits its client chunks to a top-level `build/` directory. Astro's
 * assets directory is what gets carried into OutSystems, so the chunks are
 * moved there and `q:base` is pointed at it to match.
 *
 * Wrap the upstream integration with this to fill both gaps:
 *
 * ```js
 * import qwikAstro from "@qwik.dev/astro";
 * import qwik from "islands-integrations/qwik";
 *
 * integrations: [qwik(qwikAstro({ include: ["src/framework/qwik/*"] }))];
 * ```
 *
 * Everything else — the standalone Qwik client build, the manifest, the Vite
 * plugins — is left to the upstream integration. This only intercepts the
 * `addRenderer` and `updateConfig` calls it makes during setup.
 */
export default function qwik(integration: AstroIntegration): AstroIntegration;
//# sourceMappingURL=index.d.ts.map