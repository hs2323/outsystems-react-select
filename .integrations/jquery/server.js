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
        name: "islands/jquery",
        renderToStaticMarkup,
        supportsAstroStaticSlot: false,
    };
}
/**
 * A jQuery component is a function that returns its markup, with the inline
 * scripts that drive it with jQuery.
 */
async function checkComponent(Component) {
    if (typeof Component === "string")
        return true;
    if (typeof Component === "function") {
        try {
            const result = Component({});
            return typeof result === "string";
        }
        catch {
            return false;
        }
    }
    return false;
}
function matchesPatterns(url, patterns) {
    return patterns.some((pattern) => {
        const prefix = pattern.replace(/\/?\*+$/, "");
        return url.includes(prefix);
    });
}
async function renderToStaticMarkup() {
    return { html: "<!--islands/jquery-->" };
}
export default createRenderer();
