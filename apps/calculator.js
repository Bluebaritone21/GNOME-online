function calculator(){
    var display = label("0","h1");
    display.style.textAlign = "left";
    repos(display,4,35);
    resize(display,"calc(100% - 8px)",40);
    var win = makeWindow(360,490,display);
    var buttons = [[`<img class="icon" src="${getIcon("entry-clear")}">`,"(",")","mod","&tau;"],
                   ["7","8","9","&div;","&radic;"],
                   ["4","5","6","&times;","<i>x</i>&#178;"],
                   ["1","2","3","-","="],
                   ["0",".","%","+"]];
    function evalMaths(maths){
        var equation = maths;
        equation=equation.replaceAll("\xf7", '/');
        equation=equation.replaceAll("\xd7", '*');
        equation=equation.replaceAll("\xb2", '**2');
        equation=equation.replaceAll("\u221a", 'Math.sqrt');
        equation=equation.replaceAll("\u03c4", '(2 * Math.PI)');
        equation=equation.replaceAll("%", '/(100)');
        equation=equation.replaceAll("mod", '%');
        try{
            display.innerText = eval(equation);
        }catch(e){
           display.innerText = 'Error: '+equation+"!";
        }
    }
    var buttonTable = UIelmnt("table");
    resize(buttonTable,"calc(100% - 10px)","calc(100% - 95px)");
    repos(buttonTable,5,95);
    for(var rowI = 0; rowI<buttons.length;rowI++){
        var row = UIelmnt("tr");
        for(var cellI = 0; cellI<buttons[rowI].length; cellI++){
            var cell = UIelmnt("td");
            let button = label(buttons[rowI][cellI],"button");
            resize(button, "100%", "100%");
            button.style.display = "flex";
            button.style.alignItems = "center";
            button.style.justifyContent = "center";
            button.style.fontWeight = 'bold';
            if(buttons[rowI][cellI]=="="){
                cell.setAttribute("rowspan","2");
                button.classList.add("bg-accent");
            }
            if([..."0123456789","-"].includes(buttons[rowI][cellI])){
                let txt = buttons[rowI][cellI];
                button.onclick = function(){display.innerHTML = (display.innerHTML!="0")?display.innerHTML+txt:txt};
            }else if(`<img class="icon" src="${getIcon("entry-clear")}">`==buttons[rowI][cellI]){
                button.onclick = function(){display.innerHTML = display.innerHTML.slice(0, -1) || "0";};
            }else if("<i>x</i>&#178;"==buttons[rowI][cellI]){
                button.onclick = function(){display.innerHTML = display.innerHTML+"&#178;"};
            }else if("."==buttons[rowI][cellI]){
                button.onclick = function(){display.innerHTML = display.innerHTML+"."};
            }else if("="==buttons[rowI][cellI]){
                button.onclick = function(){evalMaths(display.innerText);};
            }else if(["(",")","mod","&tau;","&div;","&times;","+","&radic;","%"].includes(buttons[rowI][cellI])){
                let txt = buttons[rowI][cellI];
                button.onclick = function(){display.innerHTML = display.innerHTML+txt;}
            }
            cell.appendChild(button);
            row.appendChild(cell);
        }
        buttonTable.appendChild(row);
    }
    win.appendChild(buttonTable);
}

registerApp("apps/icons/calculator.svg",calculator,"Calculator");