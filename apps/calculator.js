function calculator(){
    var display = label("0","h1");
    display.style.textAlign = "left";
    repos(display,0,40);
    resize(display,"calc(100% - 8px)",40);
    var win = makeWindow(360,490,display);
    var hist = [];
    var histDisplay = UIelmnt("div");
    var buttons = [["&#9003;","(",")","mod","tau"],
                   ["7","8","9","&div;","&radic;"],
                   ["4","5","6","&times;","&#120165;&#178;"],
                   ["1","2","3","-"],
                   ["0",".","%","+","="]]
    function evalMaths(maths){
        
    }
}

registerApp("apps/icons/calculator.svg",calculator,"Calculator");