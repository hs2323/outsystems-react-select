export function createRenderer(include, exclude) {
    return {
        check: async (Component, _props, _slots, metadata) => {
            const url = metadata?.componentUrl;
            if (url) {
                if (include && !matchesPatterns(url, include))
                    return false;
                if (exclude && matchesPatterns(url, exclude))
                    return false;
            }
            return checkComponent(Component);
        },
        name: "islands/lit",
        renderToStaticMarkup,
        supportsAstroStaticSlot: false,
    };
}
/**
 * A Lit component is a `LitElement` (or `ReactiveElement`) subclass. The
 * class is not constructed here: custom elements can only be created in the
 * browser. `finalize` and `elementProperties` are statics every reactive
 * element has, so they identify one without importing `lit`.
 */
async function checkComponent(Component) {
    return (typeof Component === "function" &&
        typeof Component.finalize === "function" &&
        Component.elementProperties instanceof
            Map);
}
function matchesPatterns(url, patterns) {
    return patterns.some((pattern) => {
        const prefix = pattern.replace(/\/?\*+$/, "");
        return url.includes(prefix);
    });
}
async function renderToStaticMarkup() {
    return { html: "" };
}
export default createRenderer();
