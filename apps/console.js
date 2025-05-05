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
    var lastContent = "";  // Store previous outputs

    function clear(){
        logs.innerText="";
    }
    clear();

    function logText(text){
        lastContent = logs.innerText;  // Save current state before adding
        logs.innerText = logs.innerText + "\n" + text;
        // Move cursor to end
        logs.focus();
        const range = document.createRange();
        range.selectNodeContents(logs);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        return(text);
    }

    logs.addEventListener('keydown', function(e) {
        const lines = logs.innerText.split('\n');
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const currentLine = range.startContainer.textContent;
        
        // Check if cursor is not on last line
        if (!currentLine || currentLine !== lines[lines.length - 1]) {
            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && 
                e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                e.preventDefault();
                return;
            }
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            let text = lines[lines.length - 1];  // Get last line instead of selection
            try {
                logText(eval(text));
            } catch(error) {
                logText(error);
            }
        } else if (e.key === 'Backspace') {
            // Prevent if it would delete previous outputs
            if (logs.innerText.length <= lastContent.length) {
                e.preventDefault();
            }
        }
    });
}

registerApp("apps/icons/console.svg",console,"Javascript Console");