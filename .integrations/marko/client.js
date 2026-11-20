/** The Marko template instance mounted in the island. */
const INSTANCE = Symbol.for("islands/marko/instance");
function isTemplate(Component) {
    return (typeof Component === "object" &&
        Component !== null &&
        typeof Component.mount === "function");
}
const client_default = (element) => (Component, props) => {
    // The island runtime and the OutSystems Islands module both set `ssr` when
    // they want the island (re-)rendered. Without it there is nothing to do.
    if (!element.hasAttribute("ssr"))
        return;
    if (!isTemplate(Component))
        return;
    // Marko does not support Astro slots, so only the props are passed.
    const input = { ...props };
    // A props update goes to the mounted instance: Marko re-renders what reads
    // the changed input, and `<let>` state such as a count is kept.
    const existing = element[INSTANCE];
    if (existing) {
        existing.update(input);
        return;
    }
    element.replaceChildren();
    const instance = Component.mount(input, element, "beforeend");
    element[INSTANCE] = instance;
    // Astro fires `astro:unmount` when it removes an island. Destroying the
    // instance runs the cleanup of its `<script>` tags, such as clearing a
    // timer.
    element.addEventListener("astro:unmount", () => {
        instance.destroy();
        delete element[INSTANCE];
    }, { once: true });
};
export default client_default;
