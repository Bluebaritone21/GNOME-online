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
                   ["4","5","6","&times;","<i>x</i>&#178;"],
                   ["1","2","3","-","="],
                   ["0",".","%","+"]];
    function evalMaths(maths){
    }
    var buttonTable = UIelmnt("table");
    resize(buttonTable,"calc(100% - 10px)","calc(100% - 95px)");
    repos(buttonTable,5,95);
    for(var rowI = 0; rowI<buttons.length;rowI++){
        var row = UIelmnt("tr");
        for(var cellI = 0; cellI<buttons[rowI].length; cellI++){
            var cell = UIelmnt("td");
            var button = label(buttons[rowI][cellI],"button");
            resize(button, "100%", "100%");
            button.style.display = "flex";
            button.style.alignItems = "center";
            button.style.justifyContent = "center";
            if(buttons[rowI][cellI]=="="){
                cell.setAttribute("rowspan","2");
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