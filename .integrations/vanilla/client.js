const client_default = (element) => (Component, props, { client }) => {
    if (client !== "only" && !element.hasAttribute("ssr"))
        return;
    let html;
    if (typeof Component === "string") {
        html = Component;
    }
    else if (typeof Component === "function") {
        html = Component({
            ...props,
        });
    }
    else {
        html = "";
    }
    element.innerHTML = html;
    element.querySelectorAll("script").forEach((oldScript) => {
        const newScript = document.createElement("script");
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
};
export default client_default;
