function console(){
    var commandBar = UIelmnt("input");
    commandBar.type = "text";
    repos(commandBar,"5%","calc(100% - 30px)");
    resize(commandBar,"90%",15);
    commandBar.style.backgroundColor = colour("dark3");
    commandBar.style.color = colour("light1");
    var logs = UIelmnt("pre");
    repos(logs,0,30);
    resize(logs,"100%","calc(100% - 75px)");
    logs.style.overflow = "scroll";
    logs.style.color = colour("light1");
    logs.style.textAlign="left";
    var window = makeWindow(500,500,commandBar);
    window.style.backgroundColor = colour("dark4");
    window.appendChild(logs);
    window.style.overflow="scroll";
    function clear(){
        logs.innerText="";
    }
    clear();
    function logText(text){
        logs.innerText = logs.innerText + "\n" + text;
        return(text);
    }
    commandBar.onkeypress = function(e){
        if (!e) e = window.event;
        var keyCode = e.code || e.key;
        if (keyCode == 'Enter'){
            logText("$ " + commandBar.value);
            try{
            logText(eval(commandBar.value));
            }catch(error){
                logText(error);
            }
            commandBar.value = "";
        }
    }
}

registerApp("apps/icons/console.svg",console,"Javascript Console");