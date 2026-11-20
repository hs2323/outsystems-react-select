import Twig from "twig";
const client_default = (element) => (Component, props, { client }) => {
    if (client !== "only" && !element.hasAttribute("ssr"))
        return;
    let template;
    if (typeof Component === "string") {
        template = Component;
    }
    else if (typeof Component === "function") {
        template = Component({
            ...props,
        });
    }
    else {
        template = "";
    }
    const html = Twig.twig({ data: template }).render({ ...props });
    element.innerHTML = html;
    element.querySelectorAll("script").forEach((oldScript) => {
        const newScript = document.createElement("script");
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
};
export default client_default;
