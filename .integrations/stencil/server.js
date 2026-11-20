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
        name: "islands/stencil",
        renderToStaticMarkup,
        supportsAstroStaticSlot: false,
    };
}
/**
 * A Stencil component is a class the Stencil compiler has proxied into a
 * custom element. The proxy sets the tag name as the static `is` and adds
 * `__registerHost` to the prototype, so those identify one without
 * constructing it: custom elements can only be created in the browser.
 */
async function checkComponent(Component) {
    return (typeof Component === "function" &&
        typeof Component.is === "string" &&
        typeof Component.prototype
            ?.__registerHost === "function");
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
