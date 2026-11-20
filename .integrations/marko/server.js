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
        name: "islands/marko",
        renderToStaticMarkup,
        supportsAstroStaticSlot: false,
    };
}
/**
 * A Marko component is the template object its compiled module exports, with
 * a `mount` method that renders it into the DOM. Importing the template does
 * not touch the DOM, so it can be identified on the server.
 */
async function checkComponent(Component) {
    return (typeof Component === "object" &&
        Component !== null &&
        typeof Component.mount === "function");
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
