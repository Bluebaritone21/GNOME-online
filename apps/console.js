function console(){
    // var commandBar = UIelmnt("input");
    // commandBar.type = "text";
    // repos(commandBar,"5%","calc(100% - 30px)");
    // resize(commandBar,"90%",15);
    // commandBar.style.backgroundColor = colour("dark3");
    // commandBar.style.color = colour("light1");
    var logs = UIelmnt("pre");
    repos(logs,0,30);
    resize(logs,"100%","calc(100% - 35px)");
    logs.style.overflowY = "scroll";
    logs.style.color = colour("light1");
    logs.style.textAlign="left";
    logs.contentEditable = true;
    var win = makeWindow(500,500,logs); // was commandBar
    win.style.backgroundColor = colour("dark4");
    // win.appendChild(logs);
    function clear(){
        logs.innerText="";
    }
    clear();
    function logText(text){
        logs.innerText = logs.innerText + "\n" + text;
        return(text);
    }
    logs.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            let text = window.getSelection().toString();
            try {
                logText("$ " + text);
                logText(eval(text));
            } catch(error) {
                logText(error);
            }
        } else if (e.key === 'Backspace') {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let startOffset = range.startOffset;
            if (startOffset === 0) {
                e.preventDefault();
            }
        }
    });
}

registerApp("apps/icons/console.svg",console,"Javascript Console");