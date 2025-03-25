function terminal(){
    var commandBar = document.createElement("input");
    commandBar.type = "text";
    commandBar.style.position = "absolute";
    commandBar.style.width = "90%";
    commandBar.style.left = "5%";
    commandBar.style.bottom = "5px";
    commandBar.style.height = "15px"; 
    commandBar.style.backgroundColor = "#1f1f1f";
    commandBar.style.color = "#ffffff";
    var logs = document.createElement("pre");
    logs.style.position = "absolute";
    logs.style.top = "30px";
    logs.style.left = "0px";
    logs.style.width = "100%";
    logs.style.overflow = "scroll";
    logs.style.height = "calc(100% - 65px)";
    logs.style.backgroundColor = "#0f0f0f";
    logs.style.color="white";
    logs.style.textAlign="left";
    var window = makeWindow(500,500,commandBar);
    window.style.backgroundColor = "#0f0f0f";
    window.appendChild(logs);
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

registerApp("https://apps.gnome.org/icons/scalable/org.gnome.Console.svg",terminal,"Javascript Console");