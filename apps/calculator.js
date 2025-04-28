function calculator(){
    var display = label("0","h1");
    display.style.textAlign = "left";
    repos(display,0,40);
    resize(display,"calc(100% - 8px)",40);
    var win = makeWindow(360,490,display);
    var hist = [];
    var histDisplay = UIelmnt("div");
    var buttons = [["<","(",")","%","tau"],
                             ["7","8","9","/","sqrt"],
                             []]
    function eval(){
        
    }
}

registerApp("apps/icons/calculator.svg",calculator,"Calculator");