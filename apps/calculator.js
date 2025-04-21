function calculator(){
    var warning = document.createElement("h1");
    warning.classList.add("fg-warning");
    warning.innerText = "Comming Soon";
    makeWindow(310,442,warning)
}

registerApp("apps/icons/calculator.svg",calculator,"Calculator");