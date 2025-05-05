function console(){
    var logs = UIelmnt("pre");
    repos(logs,0,30);
    resize(logs,"100%","calc(100% - 45px)");
    logs.style.overflow = "scroll";
    logs.style.color = colour("light1");
    logs.style.textAlign="left";
    logs.tabIndex = 0;
    logs.innerHTML = "$ ";
    logs.onclick = function(){logs.focus();};
    var window = makeWindow(500,500,logs);
    window.style.backgroundColor = colour("dark4");
    var cursor = '';
    logs.onfocus = function(){cursor="█";redraw()};
    logs.onblur = function(){cursor="";redraw()};
    window.style.overflow="scroll";
    var log ='$ ';
    var text='';
    function redraw(){
        logs.innerText = log + text + cursor;
    }
    function clear(){
        log="";
        redraw();
    }
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
            log = log + text;
            logText(eval(text));
            logText("$ ");
            }catch(error){
                logText(error);
                logText("$ ");
            }
            text = "";
        }else if(keyCode== 'Backspace'){
            text = text.slice(0, -1);
        }else if(keyCode.length == 1){
            text = text + keyCode;
        }
        redraw();
    });
}

registerApp("apps/icons/console.svg",console,"Javascript Console");