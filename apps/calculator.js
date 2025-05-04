function calculator(){
    var display = label("0","h1");
    display.style.textAlign = "left";
    repos(display,0,40);
    resize(display,"calc(100% - 8px)",40);
    var win = makeWindow(360,490,display);
    var hist = [];
    var histDisplay = UIelmnt("div");
    var buttons = [[`<img src="${getIcon("entry-clear")}">`,"(",")","mod","tau"],
                   ["7","8","9","&div;","&radic;"],
                   ["4","5","6","&times;","<i>x</i><sup>2</sup>"],
                   ["1","2","3","-","="],
                   ["0",".","%","+"]];
    function evalMaths(maths){
    }
    var buttonTable = UIelmnt("table");
    for(var rowI = 0; rowI<buttons.length;rowI++){
        var row = UIelmnt("tr");
        for(var cellI = 0; cellI<buttons[rowI].length; cellI++){
            var cell = UIelmnt("td");
            var button = label(buttons[rowI][cellI],"button");
            resize(button, "100%", "100%");
            if(buttons[rowI][cellI]=="="){
                cell.rowspan="2";
                button.classList.add("bg-accent");
            }
            cell.appendChild(button);
            row.appendChild(cell);
        }
        buttonTable.appendChild(row);
    }
    win.appendChild(buttonTable);
    
}

registerApp("apps/icons/calculator.svg",calculator,"Calculator");