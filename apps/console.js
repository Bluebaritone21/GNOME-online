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
    logs.tabIndex = 0;
    logs.onclick = function(){logs.focus();};
    var window = makeWindow(500,500,commandBar);
    window.style.backgroundColor = colour("dark4");
    window.appendChild(logs);
    window.style.overflow="scroll";
    var log='';
    var text='';
    function redraw(){
        logs.innerText = log + text;
    }
    function clear(){
        log="";
        redraw();
    }
    clear();
    function logText(text){
        log = log + "\n" + text;
        redraw();
        return(text);
    }
    logs.addEventListener('keydown', function(e){
        if (!e) e = window.event;
        var keyCode = e.key;
        if (keyCode == 'Enter'){
            try{
            logText(eval(commandBar.value));
            logText("$ ");
            }catch(error){
                logText(error);
                logText("$ ");
            }
            text = "";
        }else if(keyCode== 'Backspace'){
            text = text.slice(0, -1);
        }else {
            text = text + keyCode
        }
        redraw();
    });
}

registerApp("apps/icons/console.svg",console,"Javascript Console");