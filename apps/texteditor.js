function texteditor(file=null){
    function save(handle,contents){
        try{handle.createWritable().then(function(s){s.write(contents).then(
                                          function() {s.close()})
                                                     }
                                         );}
        catch(e){error(e)}
    }
    var ttl="Untitled Document";
    var textbox=UIelmnt(`textarea`);
    textbox.spellcheck = false;
    rclickMenu(textbox, [{l: "Toggle spellcheck", f: function () {textbox.spellcheck = !textbox.spellcheck;}}]);
    repos(textbox,0,43);
    resize(textbox,'calc(100% - 5px)','calc(100%  - 48px)');
    textbox.style.resize='none';
    textbox.value="";
    var win = makeWindow(1000,600,textbox);
    var title=UIelmnt('h3');
    var titlebar=UIelmnt('div');
    repos(titlebar,0,0);
    resize(titlebar,'100%',43);
    titlebar.classList.add('bg-sidebar');
    titlebar.style.pointerEvents='none';
    win.appendChild(titlebar);
    title.innerText=ttl;
    repos(title,"25%",-5);
    title.style.textAlign="center";
    title.style.width="50%";
    title.style.pointerEvents="none";
    if(file!=null){
        title.innerText=file.path;
        const reader = new FileReader();
        reader.onload = () => {
            textbox.value = reader.result;
        };
        reader.onerror = () => {
            error("Error reading the file. Please try again.");
        };
        reader.readAsText(file);
    }
    win.appendChild(title);
    var saveButton = UIelmnt("button");
    saveButton.style.position = "absolute";
    saveButton.style.top = "10px";
    saveButton.style.right = "35px";
    var saveIcon = UIelmnt("img");
    saveIcon.src = getIcon("floppy");
    saveIcon.classList.add('icon');
    saveButton.appendChild(saveIcon);
    resize(saveButton,30,30);
    saveButton.onclick = function(){if(file==null){window.showSaveFilePicker().then(function(h){save(h,textbox.value);h.getFile().then(function(f){title.innerText=f.name})})}else{save(file.handle,textbox.value)}}
    win.appendChild(saveButton);
}
registerApp("apps/icons/texteditor.svg",function(){texteditor()}, "Text Editor");