function calculator(){
    var warning = document.createElement("h1");
    warning.classList.add("fg-warning");
    warning.innerText = "Comming Soon";
    makeWindow(200,300,warning)
}

registerApp("https://apps.gnome.org/icons/scalable/org.gnome.Calculator.svg",calculator,"Calculator");