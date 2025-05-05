function console(){
    var display = UIelmnt("pre");
    repos(display,0,30);
    resize(display,"100%","calc(100% - 45px)");
    display.style.overflow = "scroll";
    display.style.color = colour("light1");
    display.style.textAlign="left";
    display.tabIndex = 0;
    display.innerHTML = "$ ";
    display.onclick = function(){display.focus();};
    var window = makeWindow(500,500,display);
    window.style.backgroundColor = colour("dark4");
    var cursor = '';
    display.onfocus = function(){cursor="█";redraw()};
    display.onblur = function(){cursor="";redraw()};
    window.style.overflow="scroll";
    var logs ='$ ';
    var text='';
    function redraw(){
        display.innerText = logs + text + cursor;
    }
    function clear(){
        logs="";
        redraw();
    }
    function print(text){
        logs = logs + "\n" + text;
        redraw();
        return(text);
    }
    display.addEventListener('keydown', function(e){
        if (!e) e = window.event;
        var keyCode = e.key;
        if (keyCode == 'Enter'){
            try{
            logs = logs + text;
            print(eval(text));
            print("$ ");
            }catch(error){
                print(error);
                print("$ ");
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