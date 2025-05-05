function nautilus(dir){
    var sidebar = document.createElement('div');
    var hist = [];
    hist.push(dir);
    repos(sidebar,0,0);
    resize(sidebar,200,"100%");
    sidebar.classList.add("bg-sidebar");
    sidebar.style.pointerEvents="none";
    var win = makeWindow(810,500,sidebar);
    var list = UIelmnt("div");
    //Quick-access buttons
    var shortcuts = UIelmnt("div");
    repos(shortcuts,5,30);
    resize(shortcuts,190,"calc(100% - 30px)");
    var shortdirs=dir.files.filter((f) => f.kind=="dir")
    win.appendChild(shortcuts);
    //Back Button
    var backButton = UIelmnt("button");
    repos(backButton,205,5);
    resize(backButton,30,30);
    var backIcon = UIelmnt("img");
    backButton.title="Go Back";
    backIcon.src = getIcon("left-large");
    backButton.appendChild(backIcon);
    backButton.onclick = function(){if(hist.length>=1){draw(hist.pop())}else{draw(dir)}}
    win.appendChild(backButton);
    backIcon.classList.add("icon");
    //Refresh button
    var refreshButton = UIelmnt("button");
    repos(refreshButton,240,5);
    resize(refreshButton,30,30);
    var refreshIcon = UIelmnt("img");
    refreshButton.title = "Refresh List (useful after you saved a file.)";
    refreshIcon.src = getIcon("arrow-circular-top-right");
    refreshIcon.classList.add("icon");
    refreshButton.appendChild(refreshIcon);
    win.appendChild(refreshButton);
    //Directory path display
    var dirPath = UIelmnt("div");
    var dirText = UIelmnt("h4");
    repos(dirText,275,-14);
    dirText.style.pointerEvents = "none";
    repos(dirPath,275,5);
    resize(dirPath,"calc(100% - 310px)",30);
    dirPath.style.backgroundColor = "rgba(100,100,100,0.5)";
    dirPath.style.textAlign = "left";
    dirPath.style.borderRadius = "10px";
    dirPath.style.pointerEvents = "none";
    win.appendChild(dirPath);
    win.appendChild(dirText)
    repos(list,205,45);
    resize(list,"calc(100% - 210px)","calc(100% - 45px)");
    list.style.textAlign="left";
    list.style.overflowY = "scroll";
    try{
        win.appendChild(list);
        var title = UIelmnt("h3");
        title.innerText="Files";
        title.pointerEvents = "none";
        repos(title, 0,-14);
        resize(title, 200, "20");
        sidebar.appendChild(title);
    }catch(e){
        error(e);
    }
    function draw(dr){try{
        function refresh(){passDirTo(dr.handle,draw)};
        refreshButton.onclick = refresh;
        shortcuts.innerHTML = "";
        for(i in shortdirs){
            let fld=shortdirs[i]
            let blt=UIelmnt("li");
            blt.innerText=" "+fld.name;
            blt.style.height="30px";
            blt.display="block";
            blt.onclick=function(){
                if(dr!=fld){
                    hist.push(fld);
                    draw(fld);
                }
            }
            shortcuts.appendChild(blt);
        }
        dirText.innerText = " "+dr.path;
        list.innerHTML="";
        for(i in dr.files){
            let blt=UIelmnt("button");
            let file = dr.files[i];
            var text = UIelmnt("inline");
            var icn = UIelmnt("img");
            icn.src = file.kind==="dir"?(file.name==".Trash"?"icons/user-trash.svg":
                                        (file.name=="GNOME"?"icons/user-home.svg":
                                        (file.name=="Camera"?"icons/folder-pictures.svg":
                                        (file.name=="Downloads"?"icons/folder-download.svg":
                                        (file.name=="Documents"?"icons/folder-documents.svg":"icons/folder.svg"))))):
                      (file.type.includes("image")?"icons/image-x-generic.svg":
                      (file.type.includes("video")?"icons/video-x-generic.svg":
                      (file.type==="text/html"?"icons/text-html.svg":
                      (file.type=="text/javascript"?"icons/application-x-executable.svg":
                      (file.type.includes("text")?"icons/text.svg":
                      (file.type==="application/pdf"?"icons/x-office-document.svg":
                      "icons/application-x-generic.svg"))))));
            blt.appendChild(icn);
            blt.classList.add("clear-button");
            resize(blt,128+20,128+20);
            blt.style.overflow="hidden";
            blt.style.textAlign="center";
            blt.appendChild(UIelmnt("br"));
            text.innerText = file.name;
            blt.appendChild(text);
            list.appendChild(blt);
            rclickMenu(blt,[{l:"Edit with Text Editor",f:function(){texteditor(file)}},
                                 {l:"Delete file",f:function(){confirm("Are you sure you want to do this? It cannot be undone!", function(){dr.handle.removeEntry(file.name).then(refresh)})}}]);
            blt.onclick = function(){
                if(file.kind === "file"){
                    if(file.type.includes("image")){
                        loupe(file);
                    }else if(file.type==="text/html"){
                        epiphany(file);
                    }else if(file.type==="text/javascript"){
                        confirm("Are you sure you want to run this?",function(){const reader = new FileReader();
                            reader.onload = () => {
                                eval(reader.result,file.path);
                            };
                            reader.onerror = () => {
                                showMessage("Error reading the file. Please try again.", "error");
                            };
                            reader.readAsText(file);})
                    }else if(file.type.includes("text")){
                        texteditor(file);
                    }else if(file.type==="application/pdf"){
                        epiphany(file);
                    }else{
                        let title = UIelmnt("h3");
                        title.innerText = "What App do you want to open this?";
                        title.classList.add("fg-success")
                        let win = makeWindow(300,400,title);
                        let options = UIelmnt("div");
                        win.appendChild(options);
                        let txtbutton = UIelmnt("li");
                        txtbutton.innerText = "Text Editor";
                        txtbutton.onclick = function(){texteditor(file);win.remove()}
                        options.appendChild(txtbutton);
                        let webbutton = UIelmnt("li");
                        webbutton.innerText = "Epiphany";
                        webbutton.onclick = function(){epiphany(file);win.remove()}
                        options.appendChild(webbutton);
                        let imgbutton = UIelmnt("li");
                        imgbutton.innerText = "Loupe";
                        imgbutton.onclick = function(){loupe(file);win.remove()}
                        options.appendChild(imgbutton)

                    }
                }else if(file.kind === "dir"){
                    hist.push(dr);
                    draw(file);
                }else{
                    error("Expected a file or Directory, got "+file.kind+". If you are not Matthew, please tell him.");
                }}
        }
    }catch(e){
        error(e);
    }}
    draw(dir);
}

registerApp("apps/icons/nautilus.svg",function(){passDirTo(fs,nautilus,function(){error("Filesystem not mounted!")})},"Nautilus");